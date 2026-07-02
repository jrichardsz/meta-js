import Logger from './Logger.js';

export default function AnnotationHelper() {}

AnnotationHelper.getDependecyAnnotationsGroupByVariableOrFunction = function(fileLines, internalAnnotationsRegexString) {
  var variables = {};
  var functions = {};
      Logger.debug("file lines count:" + fileLines.length);
  for (var i = 0; i < fileLines.length; i++) {
    var line = fileLines[i];
    Logger.debug("\nline index:" + i);
    Logger.debug("line value:" + line);
    var annotationsMatchs = line.match(new RegExp(internalAnnotationsRegexString, "g"));
    Logger.debug("line contains internal annotations?:" + annotationsMatchs);
    if (annotationsMatchs && annotationsMatchs.length > 0) {
      Logger.debug("is an annotation");
      //determines the detected annotation
      var rawLineData = AnnotationHelper.getVarOrFunctionLineOfAnnotationInThisIndexLine(fileLines, i, internalAnnotationsRegexString);
      var rawLine = rawLineData.line;
      Logger.debug("var or function raw line which contains an annotation is:" + rawLine);
      if (AnnotationHelper.isES6ClassVariable(rawLine)) {
        var variableName = AnnotationHelper.getVariableNameFromRawLine(rawLine);
        Logger.debug("is a es6 variable : " + variableName);
        //the previous algorithms did not give me the annotations names
        //so at this point I know that this is variable which contains annotations
        //I need to extract the annotations
        var rawAnnotations = AnnotationHelper.getRawAnnotationsOfSingleVarLineIndex(fileLines, rawLineData.index, internalAnnotationsRegexString);
        Logger.debug("raw annotations found in this variable:");
        Logger.debug(rawAnnotations);
        var parsedAnnotations = [];
        rawAnnotations.forEach(function(rawAnnotation, i) {
          var annotationMetadata = AnnotationHelper.getAnnotationMetadataFromRawAnnotationLine(rawAnnotation);
          Logger.debug(annotationMetadata);
          parsedAnnotations.push(annotationMetadata);
        });
        variables[variableName] = parsedAnnotations;
      } else if (AnnotationHelper.isES6AsyncFunction(rawLine)) {
        var functionName = AnnotationHelper.getEs6AsyncMethodNameFromRawLine(rawLine);
        Logger.debug("is es6 async method : " + functionName);
        var rawAnnotations = AnnotationHelper.getRawAnnotationsOfSingleVarLineIndex(fileLines, rawLineData.index, internalAnnotationsRegexString);
        Logger.debug("raw annotations found in this async module function:");
        Logger.debug(rawAnnotations);
        var parsedAnnotations = [];
        rawAnnotations.forEach(function(rawAnnotation, i) {
          Logger.debug("analizing:" + rawAnnotation);
          var annotationMetadata = AnnotationHelper.getAnnotationMetadataFromRawAnnotationLine(rawAnnotation);
          Logger.debug(annotationMetadata);
          parsedAnnotations.push(annotationMetadata);
        });

        functions[functionName] = parsedAnnotations;
      } else if (AnnotationHelper.isES6Function(rawLine)) {
        var functionName = AnnotationHelper.getEs6MethodNameFromRawLine(rawLine);
        Logger.debug("is a es6 method : " + functionName);
        var rawAnnotations = AnnotationHelper.getRawAnnotationsOfSingleVarLineIndex(fileLines, rawLineData.index, internalAnnotationsRegexString);
        Logger.debug("raw annotations found in this module function:");
        Logger.debug(rawAnnotations);
        var parsedAnnotations = [];
        rawAnnotations.forEach(function(rawAnnotation, i) {
          var annotationMetadata = AnnotationHelper.getAnnotationMetadataFromRawAnnotationLine(rawAnnotation);
          Logger.debug("parsed annotations:");
          Logger.debug(annotationMetadata);
          parsedAnnotations.push(annotationMetadata);
        });

        functions[functionName] = parsedAnnotations;
      }
    } else {
      Logger.debug("is not an annotation");
    }
  }

  return {
    variables: variables,
    functions: functions
  };

};

AnnotationHelper.getVarOrFunctionLineOfAnnotationInThisIndexLine = function(lines, line, internalAnnotationsRegexString) {

  Logger.debug("getting var or function which contains an internal annotation in this index line: "+line);
  if (line >= lines.length) {
    throw new Error('File end reached without finding line');
  }

  Logger.debug("regex to determine if this line is an internal annotation:" + internalAnnotationsRegexString);
  Logger.debug("next line related to the annotation is the index : " + (line + 1));
  Logger.debug("line to analize is:" + lines[line + 1]);
  var annotationsMatchs = lines[line + 1].match(new RegExp(internalAnnotationsRegexString, "g"));
  Logger.debug("line is an extra internal annotation: " + annotationsMatchs);
  //if this line is an annotation, execute again with next line
  //because an element could have several annotations one after the other
  if (annotationsMatchs && annotationsMatchs.length > 0) {
    Logger.debug("line is not a var/function, is an annotation. Recursive starts");
    return AnnotationHelper.getVarOrFunctionLineOfAnnotationInThisIndexLine(lines, line + 1, internalAnnotationsRegexString)
  } else {
    //return raw line var
    return {
      line: lines[line + 1],
      index: line + 1
    };
  }
};


AnnotationHelper.getRawAnnotationsOfSingleVarLineIndex = function(fileLines, rawVarLineIndex, internalAnnotationsRegexString) {

  Logger.debug("getting annotations of this raw var/function:" + fileLines[rawVarLineIndex]);
  Logger.debug("in this line:" + rawVarLineIndex);

  if (AnnotationHelper.isEmptyLine(fileLines[rawVarLineIndex])) {
    Logger.debug("empty line");
    return;
  }

  Logger.debug("regex to determine if this line is an annotation:" + internalAnnotationsRegexString);

  var foundRawAnnotations = [];
  //I start to search the annotations in reverse order because the annotations are before the element
  for (var i = rawVarLineIndex - 1; i > 0; i--) {
    Logger.debug("line index to analize is : " + i + " and have this value: "+fileLines[i]);

    if (AnnotationHelper.isEmptyLine(fileLines[i])) {
      Logger.debug("empty line");
      break;
    }

    var annotationsMatchs = fileLines[i].match(new RegExp(internalAnnotationsRegexString, "g"));
    Logger.debug("line contains or is an annotation?:" + annotationsMatchs);
    if (annotationsMatchs && annotationsMatchs.length > 0) {
      Logger.debug("annotation found");
      foundRawAnnotations.push(fileLines[i])
    }
  }

  return foundRawAnnotations;

};

/*
Get line of file using number
input: Page, Action
output: @Page\\(.+\\)|@Action\\(.+\\)
*/
/*not tested*/
AnnotationHelper.createRegexFromAnnotations = function(annotationsArray) {
  var regexString = "";
  for (let i = 0; i < annotationsArray.length; i++) {
    regexString += "\\[" + annotationsArray[i] + "\\(.+\\)" + "\\]|\\[" + annotationsArray[i]+"\\]"
    if (i < annotationsArray.length - 1) {
      regexString += "|"
    }
  }
  return regexString;
}


AnnotationHelper.getHeadAnnotationMetadata = function(fileContent, headAnnotationsStringRegex) {
  // TODO: improve regex to match only when @anotation is close to the module name and 
  // also at the top of js file
  // @Foo  
  // function BarModule() {
  //  
  var regexMatches = fileContent.match(new RegExp(headAnnotationsStringRegex, "g"));
  Logger.debug("Detected head annotations: " + regexMatches);
  if (regexMatches && regexMatches.length > 0) {
    return AnnotationHelper.getAnnotationMetadataFromRawAnnotationLine(regexMatches[0]);
  }
};

AnnotationHelper.isClassicVariable = function(line) {
  var regexMatches = line.match(new RegExp('\\s*var\\s+[a-zA-Z][\\w_]+\\s*\\;', "g"));
  if (regexMatches && regexMatches.length > 0) {
    return true;
  } else {
    return false;
  }
};

AnnotationHelper.isModuleVariable = function(line) {
  var regexMatches = line.match(new RegExp('\\s*this\\.[a-zA-Z][\\w_]+\\s*\\;', "g"));
  if (regexMatches && regexMatches.length > 0) {
    return true;
  } else {
    return false;
  }
};

AnnotationHelper.isES6ClassVariable = function(line) {
  var regexMatches = line.match(new RegExp('\\s*[a-zA-Z][\\w_]+\\s*\\;', "g"));
  if (regexMatches && regexMatches.length > 0) {
    return true;
  } else {
    return false;
  }
};

AnnotationHelper.isModuleFunction = function(line) {
  var regexMatches = line.match(new RegExp('\\s*this\\.[a-zA-Z][\\w_]+\\s*[=]\\s*\\((\\s*[a-zA-Z][\\w_]*\\s*,?\s*)*\\)\\s*[=][>]\\s*{\\s*', "g"));
  if (regexMatches && regexMatches.length > 0) {
    return true;
  } else {
    return false;
  }
};

AnnotationHelper.isModuleAsyncFunction = function(line) {
  var regexMatches = line.match(new RegExp('\\s*this\\.[a-zA-Z][\\w_]+\\s*[=]\\s*async\\s*\\((\\s*[a-zA-Z][\\w_]*\\s*,?\s*)*\\)\\s*[=][>]\\s*{\\s*', "g"));
  if (regexMatches && regexMatches.length > 0) {
    return true;
  } else {
    return false;
  }
};

AnnotationHelper.isES6Function = function(line) {
  var regexMatches = line.match(new RegExp('\\s*[a-zA-Z][a-zA-Z0-9_]*\\s*\\([^)]*\\)\\s*\\{', 'g'));
  console.log(regexMatches)
  if (regexMatches && regexMatches.length > 0) {
    return true;
  } else {
    return false;
  }
};

AnnotationHelper.isES6AsyncFunction = function(line) {
  var regexMatches = line.match(new RegExp('\\s*async\\s+[a-zA-Z][a-zA-Z0-9_]*\\s*\\([^)]*\\)\\s*\\{', 'g'));
  console.log(regexMatches)
  if (regexMatches && regexMatches.length > 0) {
    return true;
  } else {
    return false;
  }
};

AnnotationHelper.isEmptyLine = function(line) {
  return (!line || /^\s*$/.test(line));
};

AnnotationHelper.getVariableNameFromRawLine = function(line) {
  var regexMatches = line.match(new RegExp('\\s*[a-zA-Z][\\w_]+\\s*;', "g"));
  return regexMatches[0].replace(";", "").replace(/\s/g,'');
};

AnnotationHelper.getFunctionNameFromRawLine = function(line) {
  var regexMatches = line.match(new RegExp('\\s*const\\s*[a-zA-Z][\\w_]+', "g"));
  return regexMatches[0].replace("const", "").replace(/\s/g,'');
};

AnnotationHelper.getModuleFunctionNameFromRawLine = function(line) {
  var regexMatches = line.match(new RegExp('\\s*this\\.[a-zA-Z][\\w_]+', "g"));
  return regexMatches[0].replace("this.", "").replace(/\s/g,'');
};

AnnotationHelper.getEs6MethodNameFromRawLine = function(line) {
  return line.replace(new RegExp('\\s*\\([^)]*\\)\\s*\\{', 'g'),"").replace(/\s+/,"");
};

AnnotationHelper.getEs6AsyncMethodNameFromRawLine = function(line) {
  return line.replace(new RegExp('\\s*\\([^)]*\\)\\s*\\{', 'g'),"").replace(/^\s*async\s*/,"").replace(/\s+/,"");
};

AnnotationHelper.getAnnotationMetadataFromRawAnnotationLine = function(line) {
  var rawArguments = line.match(new RegExp('[a-zA-Z]+\\s*=\\s*\\"[a-zA-Z/_:-\\d]+\\"', "g"));
  var annotationArguments = {};
  var name = AnnotationHelper.getAnnotationNameFromRawAnnotation(line);
  if (typeof rawArguments === 'undefined' || rawArguments == null || rawArguments.length == 0) {
    return {
      name: name,
      arguments: {}
    };
  }

  rawArguments.forEach(function(rawArgument) {
    var argumentArray = rawArgument.split("=");
    var key = argumentArray[0].trim();
    var value = argumentArray[1].trim().replace(new RegExp("\"", 'g'), "");
    annotationArguments[key] = value;
  });
  return {
    name: name,
    arguments: annotationArguments
  };
};

AnnotationHelper.getAnnotationNameFromRawAnnotation = function(rawAnnotation) {
  Logger.debug("rawAnnotation: "+ rawAnnotation)
  //detect if it is an empty annotation or not
  var cleanAnnotation = rawAnnotation.trim();
  var rawAnnotationWithArguments = cleanAnnotation.match(new RegExp('\\[[a-zA-Z]{3,}\\(\\s*.+\\s*\\)\\]'));
  //var rawAnnotationWithArguments = cleanAnnotation.match(new RegExp('\\[[a-zA-Z]{3,}\\(((^|[,])[a-zA-Z]+\\s*=\\s*\\"[a-zA-Z/_:-\\d]+\\")+\\)\\]'));
  if(typeof rawAnnotationWithArguments !== 'undefined' && rawAnnotationWithArguments != null){
    Logger.debug("rawAnnotationWithArguments")
    var removedArgsString = cleanAnnotation.replace(/\([^\)]+\)/,"");
    Logger.debug(removedArgsString)
    var rawAnnotationNameMatch = removedArgsString.match(new RegExp('\\[[a-zA-Z]{3,}\\]', "g"));
    if(typeof rawAnnotationNameMatch === 'undefined' || rawAnnotationNameMatch == null){
      throw new Error("expected raw annotation is wrong. Is not possible get its name:"+rawAnnotation);
    }
    return removedArgsString.substring(1, removedArgsString.length-1);
  }else{
    var rawAnnotationWithoutArguments = cleanAnnotation.match(new RegExp('\\[\\s*[a-zA-Z]{3,}\\s*\\]', "g"));
    Logger.debug(rawAnnotationWithoutArguments)
    if(typeof rawAnnotationWithoutArguments === 'undefined' || rawAnnotationWithoutArguments == null){
      throw new Error("raw annotation is wrong. Is not possible get its name:"+rawAnnotation);
    }
    
    return cleanAnnotation.substring(1, cleanAnnotation.length-1).trim();
  }

};

AnnotationHelper.getExportedModuleName = function(fileContent) {
  if(typeof fileContent === 'undefined' || fileContent == ""){
      throw new Error("error while module exported name was being extracted because js file content is null or empty");
  }

  var regexMatches = fileContent.match(new RegExp('\\s*module.exports\\s*=\\s*[\\w_]+;\\s*', "g"));

  if(typeof regexMatches === 'undefined' || regexMatches == null || regexMatches.length == 0){
      let allLines = fileContent.trim().split("\n")
      let lastLines = allLines.slice(-5)
      throw new Error("commonjs module should end with : module.exports = Foo; \nContent:\n"+allLines);
  }

  if(regexMatches.length > 1){
      throw new Error("commonjs module should end with only one export : module.exports = Foo;");
  }

  return regexMatches[0]
    .replace(/(^[ \t]*\n)/gm, "")
    .replace("module.exports", "")
    .replace("=", "")
    .replace(";", "")
    .replace(/\s/g,'');

};


AnnotationHelper.getExportedClassName = function(fileContent) {
  if(typeof fileContent === 'undefined' || fileContent == ""){
      throw new Error("error while module exported name was being extracted because js file content is null or empty");
  }

  var regexMatches = fileContent.match(new RegExp('\\s*export\\s+class\\s+[\\w_]+\\s*', "g"));

  if(typeof regexMatches === 'undefined' || regexMatches == null || regexMatches.length == 0){
      let allLines = fileContent.trim().split("\n")
      throw new Error("ES6 class should be like export class Foo { \nContent:\n"+allLines);
  }

  if(regexMatches.length > 1){
      throw new Error("ES6 class should be like export class Foo {");
  }

  return regexMatches[0].trim()
    .replace(/export\s+class\s+/gm, "")
    .replace(/\s/g,'');
};
