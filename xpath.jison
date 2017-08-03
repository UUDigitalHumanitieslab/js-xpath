/*
Copyright (c) 2010-2011, Dimagi Inc., and individual contributors.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the Dimagi, nor the names of its contributors may 
      be used to endorse or promote products derived from this software 
      without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL DIMAGI INC. BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/* This jison grammar file is based off of the dimagi grammar file which can be found here:
 * https://github.com/dimagi/js-xpath/tree/master/src/jison
 * Which in turn is based off of the javarosa grammar file which can be found here:
 * https://bitbucket.org/javarosa/javarosa/src/tip/core/src/org/javarosa/xpath/parser/xpath.grammar
 *
 * Also see the associated lex file:
 * https://bitbucket.org/javarosa/javarosa/src/tip/core/src/org/javarosa/xpath/parser/xpath.flex

 * See README.md for more information
 */



/* 
 *  TODO Code?
 */

%right OR
%right AND
%left EQ NEQ
%left LT LTE GT GTE
%left PLUS MINUS
%left MULT DIV MOD
%nonassoc UMINUS
%left UNION

%%

xpath_expr:  expr EOF   { return $1; }
    ;

 
expr:   base_expr                   {  $$ = $1; } /* not necessary as this is the default */
    |   op_expr                     {  $$ = $1; }
    |   path_expr                   {  $$ = $1; }
    |   filter_expr                 {  $$ = $1; }
    |   hashtag_expr                {  $$ = $1; }
    ;

base_expr:  LPAREN expr RPAREN            { $2.parens = true; $$ = $2; }
        |   func_call                
        |   VAR                           { $$ = new yy.xpathModels.XPathVariableReference($1); }
        |   literal               
        ;

op_expr: expr OR expr               { $$ = new yy.xpathModels.XPathBoolExpr({"type": "or", "left": $1, "right": $3}); }
    |   expr AND expr               { $$ = new yy.xpathModels.XPathBoolExpr({"type": "and", "left": $1, "right": $3}); }
    |   expr EQ expr                { $$ = new yy.xpathModels.XPathEqExpr({"type": "==", "left": $1, "right": $3}); }
    |   expr NEQ expr               { $$ = new yy.xpathModels.XPathEqExpr({"type": "!=", "left": $1, "right": $3}); }
    |   expr LT expr                { $$ = new yy.xpathModels.XPathCmpExpr({"type": "<", "left":$1, "right": $3}); }
    |   expr LTE expr               { $$ = new yy.xpathModels.XPathCmpExpr({"type": "<=", "left":$1, "right": $3}); }
    |   expr GT expr                { $$ = new yy.xpathModels.XPathCmpExpr({"type": ">", "left":$1, "right": $3}); }
    |   expr GTE expr               { $$ = new yy.xpathModels.XPathCmpExpr({"type": ">=", "left":$1, "right": $3}); }
    |   expr PLUS expr              { $$ = new yy.xpathModels.XPathArithExpr({"type": "+", "left":$1, "right": $3}); }
    |   expr MINUS expr             { $$ = new yy.xpathModels.XPathArithExpr({"type": "-", "left":$1, "right": $3}); }
    |   expr MULT expr              { $$ = new yy.xpathModels.XPathArithExpr({"type": "*", "left":$1, "right": $3}); }
    |   expr DIV expr               { $$ = new yy.xpathModels.XPathArithExpr({"type": "/", "left":$1, "right": $3}); }
    |   expr MOD expr               { $$ = new yy.xpathModels.XPathArithExpr({"type": "%", "left":$1, "right": $3}); }
    |   MINUS expr %prec UMINUS     { $$ = new yy.xpathModels.XPathNumNegExpr({"type": "num-neg", "value":$2}); }
    |   expr UNION expr             { $$ = new yy.xpathModels.XPathUnionExpr({"type": "union", "left":$1, "right": $3}); } 
    ;

func_call:  QNAME LPAREN arg_list RPAREN   { $$ = new yy.xpathModels.XPathFuncExpr({id: $1, args: $3}); } 
        |   QNAME LPAREN RPAREN            { $$ = new yy.xpathModels.XPathFuncExpr({id: $1, args: []}); } 
        ;

arg_list:   arg_list COMMA expr     { var args = $1;
                                      args.push($3);
                                      $$ = args; }         
        |   expr                    { $$ = [$1]; }
        ;

path_expr:  loc_path
        |   filter_expr SLASH rel_loc_path          { $$ = new yy.xpathModels.XPathPathExpr({
                                                                    initialContext: yy.xpathModels.XPathInitialContextEnum.EXPR,
                                                                    filter: $1, steps: $3}); }
        |   filter_expr DBL_SLASH rel_loc_path      { var steps = $3;
                                                      steps.splice(0, 0, new yy.xpathModels.XPathStep({
                                                                                axis: yy.xpathModels.XPathAxisEnum.DESCENDANT_OR_SELF, 
                                                                                test: yy.xpathModels.XPathTestEnum.TYPE_NODE}));
                                                      $$ = new yy.xpathModels.XPathPathExpr({
                                                                    initialContext: yy.xpathModels.XPathInitialContextEnum.EXPR,
                                                                    filter: $1, steps: steps}); }
        |   base_expr SLASH rel_loc_path            { // could eliminate filterExpr wrapper, but this makes tests pass as-is
                                                      var filterExpr = new yy.xpathModels.XPathFilterExpr({expr: $1});
                                                      $$ = new yy.xpathModels.XPathPathExpr({
                                                                    initialContext: yy.xpathModels.XPathInitialContextEnum.EXPR,
                                                                    filter: filterExpr, steps: $3}); }
        |   base_expr DBL_SLASH rel_loc_path        { var steps = $3;
                                                      // could eliminate filterExpr wrapper, but this makes tests pass as-is
                                                      var filterExpr = new yy.xpathModels.XPathFilterExpr({expr: $1});
                                                      steps.splice(0, 0, new yy.xpathModels.XPathStep({
                                                                                axis: yy.xpathModels.XPathAxisEnum.DESCENDANT_OR_SELF, 
                                                                                test: yy.xpathModels.XPathTestEnum.TYPE_NODE}));
                                                      $$ = new yy.xpathModels.XPathPathExpr({
                                                                    initialContext: yy.xpathModels.XPathInitialContextEnum.EXPR,
                                                                    filter: filterExpr, steps: steps}); }
        ;

filter_expr:  base_expr predicate     { $$ = new yy.xpathModels.XPathFilterExpr({expr: $1, predicates: [$2]}); }
        |   filter_expr predicate     { var filterExpr = $1;
                                        filterExpr.predicates.push($2);
                                        $$ = filterExpr; }
        ;

hashtag_expr:  HASH QNAME SLASH hashtag_path              { $$ = new yy.xpathModels.HashtagExpr({initialContext: yy.xpathModels.XPathInitialContextEnum.HASHTAG,
                                                                      namespace: $2,
                                                                      steps: $4}); }
        |  HASH QNAME                                     { $$ = new yy.xpathModels.HashtagExpr({initialContext: yy.xpathModels.XPathInitialContextEnum.HASHTAG,
                                                                      namespace: $2,
                                                                      steps: []}); }
        ;

hashtag_path: QNAME  {$$ = [$1];}
        |   hashtag_path SLASH QNAME {var path = $1; path.push($3); $$ = path;}
        ;


predicate:   LBRACK expr RBRACK            { $$ = $2; }
        ;


loc_path:   rel_loc_path                    { $$ = new yy.xpathModels.XPathPathExpr({initialContext: yy.xpathModels.XPathInitialContextEnum.RELATIVE,
                                                                      steps: $1}); }
        |   SLASH rel_loc_path              { $$ = new yy.xpathModels.XPathPathExpr({initialContext: yy.xpathModels.XPathInitialContextEnum.ROOT,
                                                                      steps: $2}); }
        |   DBL_SLASH rel_loc_path          { var steps = $2;
                                              // insert descendant step into beginning
                                              steps.splice(0, 0, new yy.xpathModels.XPathStep({axis: yy.xpathModels.XPathAxisEnum.DESCENDANT_OR_SELF, 
                                                                                test: yy.xpathModels.XPathTestEnum.TYPE_NODE}));
                                              $$ = new yy.xpathModels.XPathPathExpr({initialContext: yy.xpathModels.XPathInitialContextEnum.ROOT,
                                                                      steps: steps}); }
        |   SLASH                   { $$ = new yy.xpathModels.XPathPathExpr({initialContext: yy.xpathModels.XPathInitialContextEnum.ROOT,
                                                              steps: []});}
        ;

rel_loc_path: step                        { $$ = [$1];}
        |   rel_loc_path SLASH step       { var path = $1;
                                            path.push($3);
                                            $$ = path; }
        |   rel_loc_path DBL_SLASH step   { var path = $1;
                                            path.push(new yy.xpathModels.XPathStep({axis: yy.xpathModels.XPathAxisEnum.DESCENDANT_OR_SELF, 
                                                                     test: yy.xpathModels.XPathTestEnum.TYPE_NODE}));
                                            path.push($3);
                                            $$ = path; }
        ;

step:   step_unabbr                 { $$ = $1; }
    |   DOT                         { $$ = new yy.xpathModels.XPathStep({axis: yy.xpathModels.XPathAxisEnum.SELF, 
                                                          test: yy.xpathModels.XPathTestEnum.TYPE_NODE}); }
    |   DBL_DOT                     { $$ = new yy.xpathModels.XPathStep({axis: yy.xpathModels.XPathAxisEnum.PARENT, 
                                                          test: yy.xpathModels.XPathTestEnum.TYPE_NODE}); }
    ;

step_unabbr:  step_unabbr predicate       { var step = $1;
                                            step.predicates.push($2);
                                            $$ = step; }
        |   step_body                { $$ = $1; }
        ;

step_body: node_test                    { var nodeTest = $1; // temporary dict with appropriate args
                                          nodeTest.axis = yy.xpathModels.XPathAxisEnum.CHILD;
                                          $$ = new yy.xpathModels.XPathStep(nodeTest); }
        |   axis_specifier node_test    { var nodeTest = $2;  // temporary dict with appropriate args
                                          nodeTest.axis = $1; // add axis
                                          $$ = new yy.xpathModels.XPathStep(nodeTest); }
        ;

axis_specifier:  QNAME DBL_COLON           { $$ = yy.xpathModels.validateAxisName($1); }
        |   AT                  { $$ = yy.xpathModels.XPathAxisEnum.ATTRIBUTE; }
        ;

node_test:  QNAME                 { $$ = {"test": yy.xpathModels.XPathTestEnum.NAME, "name": $1}; }
        |   WILDCARD                { $$ = {"test": yy.xpathModels.XPathTestEnum.NAME_WILDCARD}; }
        |   NSWILDCARD              { $$ = {"test": yy.xpathModels.XPathTestEnum.NAMESPACE_WILDCARD, "namespace": $1}; }
        |   NODETYPE_NODE LPAREN RPAREN     { $$ = {"test": yy.xpathModels.XPathTestEnum.TYPE_NODE}; }
        |   NODETYPE_TEXT LPAREN RPAREN     { $$ = {"test": yy.xpathModels.XPathTestEnum.TYPE_TEXT}; }
        |   NODETYPE_COMMENT LPAREN RPAREN      { $$ = {"test": yy.xpathModels.XPathTestEnum.TYPE_COMMENT}; }
        |   NODETYPE_PROCINSTR LPAREN RPAREN  { $$ = {"test": yy.xpathModels.XPathTestEnum.TYPE_PROCESSING_INSTRUCTION, "literal": null}; }
        |   NODETYPE_PROCINSTR LPAREN STR RPAREN  { $$ = {"test": yy.xpathModels.XPathTestEnum.TYPE_PROCESSING_INSTRUCTION, "literal": $3}; }
        ;

literal: STR                       { $$ = new yy.xpathModels.XPathStringLiteral($1); }
    |   NUM                       { $$ = new yy.xpathModels.XPathNumericLiteral($1); }
    ;
  
