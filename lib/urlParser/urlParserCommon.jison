

/* lexical grammar */
%lex

%%

\s+          return 'WHITESPACE';
^((H|h)(T|t)(T|t)(P|p)(S|s)?\:\/\/)    return 'HTTP';
^([M|m][A|a][I|i][L|l][T|t][O|o]\:(\/\/)?(([0-9]|[a-z]|[A-Z])+((_|\-|\.)*([0-9]|[a-z]|[A-Z])+)*)+\@(([0-9]|[a-z]|[A-Z])+((\-)*([0-9]|[a-z]|[A-Z])+)*)(\.(([0-9]|[a-z]|[A-Z])+((\-)*([0-9]|[a-z]|[A-Z])+)*))*) return 'EMAIL';

<<EOF>>      return 'EOF';
(\#[^ ]+)    return 'HASHEND'; /* Might need to investigate to make it more roboust */

(\/(([0-9]|[a-z]|[A-Z]|\+|_|\-|\'|\.|\(|\)|\%20)+\/?)*)            return 'URLPATH';

([0-9]|[a-z]|[A-Z]|_)+\=([0-9]|[a-z]|[A-Z]|_|\+|\%20|\-|\.)+ return 'KEYVALUEPAIR';
'-'          return '-';
'.'          return '.';
':'          return ':';
'@'          return '@';
'/'          return '/';
'?'          return '?';
'&'          return '&';
'='          return '=';
'_'          return '_';
'+'          return '+';
([0-9]|[a-z]|[A-Z])+ return 'IDENTIFIER';
(\%20|\%21|\%23|\%24|\%26|\%27|\%28|\%29|\%2A|\%2B|\%2C|\%2F|\%3A|\%3B|\%3D|\%3F|\%40|\%5B|\%5D)+ return 'PASSWORD_SPECIAL';
/lex

%start input

%% /* language grammar */

input:
    EMAIL EOF |
    url HASHEND EOF |
    url EOF
    ;

url:
    baseurlWithPath |
    baseurlWithPath '?' querystring
    ;

querystring:
    KEYVALUEPAIR |
    KEYVALUEPAIR '&' querystring
    ;

baseurlWithPath:
    baseurl |
    baseurl URLPATH
    ;

baseurl:
    hostname |
    HTTP hostname |
    HTTP loginpassword hostname
    ;

port:
    ':' IDENTIFIER {
        if (!/^[0-9]+$/.test($2)) throw 'port should only contain integer numbers';
        if (($2 < 0) || ($2 > 65536)) throw 'port out of bounds';
    };

hostname:
    IDENTIFIER |
    IDENTIFIER '-' hostname |
    IDENTIFIER port |
    IDENTIFIER '.' hostname
    ;

loginpassword:
    IDENTIFIER ':' password '@'
    ;

password:
    IDENTIFIER |
    PASSWORD_SPECIAL |
    IDENTIFIER password |
    PASSWORD_SPECIAL password
    ;
