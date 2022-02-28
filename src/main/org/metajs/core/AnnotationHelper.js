const fs = require('fs');
const pathUtil = require('path');
var Logger = require('./Logger.js')

function AnnotationHelper() {

}

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
      if (AnnotationHelper.isModuleVariable(rawLine)) {
        var variableName = AnnotationHelper.getVariableNameFromRawLine(rawLine);
        Logger.debug("is a module variable : " + variableName);
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
      } else if (AnnotationHelper.isModuleFunction(rawLine)) {
        var functionName = AnnotationHelper.getModuleFunctionNameFromRawLine(rawLine);
        Logger.debug("is a module function : " + functionName);
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
      }else if (AnnotationHelper.isModuleAsyncFunction(rawLine)) {
        var functionName = AnnotationHelper.getModuleFunctionNameFromRawLine(rawLine);
        Logger.debug("is a module async function : " + functionName);
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

  Logger.debug("regex to determine if this line is an annotation:" + internalAnnotationsRegexString);
  Logger.debug("line contaning the element is the index +1: " + (line + 1));
  Logger.debug("line to analize is:" + lines[line + 1]);
  var annotationsMatchs = lines[line + 1].match(new RegExp(internalAnnotationsRegexString, "g"));
  Logger.debug("line contains or is an annotation?:" + annotationsMatchs);
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
    regexString += "@" + annotationsArray[i] + "\\(.+\\)" + "|@" + annotationsArray[i]
    if (i < annotationsArray.length - 1) {
      regexString += "|"
    }
  }
  return regexString;
}


AnnotationHelper.getHeadAnnotationMetadata = function(fileContent, headAnnotationsStringRegex) {
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

AnnotationHelper.isEmptyLine = function(line) {
  return (!line || /^\s*$/.test(line));
};

AnnotationHelper.getVariableNameFromRawLine = function(line) {
  var regexMatches = line.match(new RegExp('\\s*this\\.[a-zA-Z][\\w_]+', "g"));
  return regexMatches[0].replace("this.", "").replace(/\s/g,'');
};

AnnotationHelper.getFunctionNameFromRawLine = function(line) {
  var regexMatches = line.match(new RegExp('\\s*const\\s*[a-zA-Z][\\w_]+', "g"));
  return regexMatches[0].replace("const", "").replace(/\s/g,'');
};

AnnotationHelper.getModuleFunctionNameFromRawLine = function(line) {
  var regexMatches = line.match(new RegExp('\\s*this\\.[a-zA-Z][\\w_]+', "g"));
  return regexMatches[0].replace("this.", "").replace(/\s/g,'');
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
  //detect if it is an empty annotation or not
  var rawAnnotationWithArguments = rawAnnotation.match(new RegExp('\\(.+\\)', "g"));
  if(typeof rawAnnotationWithArguments === 'undefined' || rawAnnotationWithArguments == null){
    var rawAnnotationNameMatch = rawAnnotation.match(new RegExp('@[a-zA-Z]+', "g"));
    if(typeof rawAnnotationNameMatch === 'undefined' || rawAnnotationNameMatch == null){
      throw new Error("expected raw annotation is wrong. Is not possible get its name:"+rawAnnotation);
    }
    return rawAnnotationNameMatch[0].replace("@","");
  }else{
    return rawAnnotation.substring(rawAnnotation.indexOf("@") + 1, rawAnnotation.indexOf("("));
  }

};



module.exports = AnnotationHelper;
