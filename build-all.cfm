<cfprocessingdirective suppressWhitespace="true" />
<cfsetting requesttimeout="1200" />
<cfscript>
	application.assetBundleVersion = trim( FileRead('assetBundleVersion.txt') ); 
	include  template="import.cfm";
	include  template="build.cfm";
</cfscript>
