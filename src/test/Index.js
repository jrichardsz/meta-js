const include = require('nodejs-require-enhancer');

//tests
include('org/metajs/core/AnnotationHelper/AnnotationHelper_isClassicVariable.js', 'test');
include('org/metajs/core/AnnotationHelper/AnnotationHelper_isModuleVariable.js', 'test');
include('org/metajs/core/AnnotationHelper/AnnotationHelper_isFunction.js', 'test');
include('org/metajs/core/AnnotationHelper/AnnotationHelper_isEmptyLine.js', 'test');
include('org/metajs/core/AnnotationHelper/AnnotationHelper_getHeadAnnotationMetadata.js', 'test');
include('org/metajs/core/AnnotationHelper/AnnotationHelper_getRawAnnotationsOfSingleVarLineIndex.js', 'test');
include('org/metajs/core/AnnotationHelper/AnnotationHelper_getVariableNameFromRawLine.js', 'test');
include('org/metajs/core/AnnotationHelper/AnnotationHelper_getFunctionNameFromRawLine.js', 'test');
include('org/metajs/core/AnnotationHelper/AnnotationHelper_getAnnotationMetadataFromRawAnnotationLine.js', 'test');
include('org/metajs/core/AnnotationHelper/AnnotationHelper_getVarOrFunctionLineOfAnnotationInThisIndexLine.js', 'test');
include('org/metajs/core/AnnotationHelper/AnnotationHelper_getAnnotationNameFromRawAnnotation.js', 'test');
include('org/metajs/core/AnnotationHelper/AnnotationHelper_getDependecyAnnotationsGroupByVariableOrFunction.js', 'test');

include('org/metajs/core/DependencyHelper/DependencyHelper_getDependecies.js', 'test');
