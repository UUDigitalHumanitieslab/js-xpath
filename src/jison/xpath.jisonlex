%{  /*
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
%}
WhiteSpace          (\s+)
Digit               [0-9]
Letter              [A-Za-z]
NameStartChar       [A-Za-z_]
NameTrailChar       [A-Za-z0-9._-]
NCName              [A-Za-z_][A-Za-z0-9._-]*
QName               [A-Za-z_][A-Za-z0-9._-]*(":"[A-Za-z_][A-Za-z0-9._-]*)?

%s INITIAL OP_CONTEXT VAL_CONTEXT
      
%%

<*>{WhiteSpace}                         /* ignore whitespace */ 

<*>"node"/({WhiteSpace}?"(")                     { yy.xpathModels.debugLog("NODETYPE", yytext); return "NODETYPE_NODE"; }
<*>"text"/({WhiteSpace}?"(")                     { yy.xpathModels.debugLog("NODETYPE", yytext); return "NODETYPE_TEXT"; }

<*>"comment"/({WhiteSpace}?"(")                  { yy.xpathModels.debugLog("NODETYPE", yytext); return "NODETYPE_COMMENT"; }
<*>"processing-instruction"/({WhiteSpace}?"(")   { yy.xpathModels.debugLog("NODETYPE", yytext); return "NODETYPE_PROCINSTR"; }

<*>"$"{QName}                                      { this.begin("OP_CONTEXT"); yytext = yytext.substr(1,yyleng-1); yy.xpathModels.debugLog("VAR", yytext); return "VAR"; }

<VAL_CONTEXT,INITIAL>{NCName}":*"  { this.begin("OP_CONTEXT"); 
                                     yytext = yytext.substr(0, yyleng-2);
                                     yy.xpathModels.debugLog("NSWILDCARD", yytext); return "NSWILDCARD"; }
<VAL_CONTEXT,INITIAL>{QName}       { this.begin("OP_CONTEXT"); yy.xpathModels.debugLog("QNAME", yytext); return "QNAME"; } 
<VAL_CONTEXT,INITIAL>"*"           { this.begin("OP_CONTEXT"); yy.xpathModels.debugLog("WILDCARD", yytext); return "WILDCARD"; }

<OP_CONTEXT>"*"                    { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("MULT", yytext); return "MULT"; }
<OP_CONTEXT>("and")                  { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("AND", yytext); return "AND"; }
<OP_CONTEXT>("or")                   { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("OR", yytext); return "OR"; }
<OP_CONTEXT>("div")                  { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("DIV", yytext); return "DIV"; }
<OP_CONTEXT>("mod")                  { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("MOD", yytext); return "MOD"; }

<*>({Digit}+("."{Digit}*)?|("."{Digit}+))             { this.begin("OP_CONTEXT"); yy.xpathModels.debugLog("NUM", yytext); return "NUM"; }


<*>"="         { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("EQ", yytext); return "EQ"; }
<*>"!="        { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("NEQ", yytext); return "NEQ"; }
<*>"<="        { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("LTE", yytext); return "LTE"; }
<*>"<"         { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("LT", yytext); return "LT"; }
<*>">="        { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("GTE", yytext); return "GTE"; }
<*>">"         { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("GT", yytext); return "GT"; }
<*>"+"         { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("PLUS", yytext); return "PLUS"; }
<*>"-"         { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("MINUS", yytext); return "MINUS"; }
<*>"|"         { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("UNION", yytext); return "UNION"; }
<*>"//"        { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("DBL", yytext); return "DBL_SLASH"; }
<*>"/"         { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("SLASH", yytext); return "SLASH"; }
<*>"["         { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("LBRACK", yytext); return "LBRACK"; }
<*>"]"         { this.begin("OP_CONTEXT");  yy.xpathModels.debugLog("RBRACK", yytext); return "RBRACK"; }
<*>"("         { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("LPAREN", yytext); return "LPAREN"; }
<*>")"         { this.begin("OP_CONTEXT");  yy.xpathModels.debugLog("RPAREN", yytext); return "RPAREN"; }
<*>".."        { this.begin("OP_CONTEXT");  yy.xpathModels.debugLog("DBL", yytext); return "DBL_DOT"; }
<*>"."         { this.begin("OP_CONTEXT");  yy.xpathModels.debugLog("DOT", yytext); return "DOT"; }
<*>"@"         { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("AT", yytext); return "AT"; }
<*>"::"        { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("DBL", yytext); return "DBL_COLON"; }
<*>","         { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("COMMA", yytext); return "COMMA"; }
<*>"#"         { this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("HASH", yytext); return "HASH"; }


<*>("\""[^"\""]*"\""|'\''[^'\'']*'\'')               { this.begin("OP_CONTEXT"); yy.xpathModels.debugLog("STR", yytext); return "STR"; }


<*><<EOF>>                              return 'EOF';
