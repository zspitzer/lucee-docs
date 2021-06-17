component {
	this.name = "luceeDocumentationBuilder-" & Hash( GetCurrentTemplatePath() );

	this.localMode = true;

	variables.assetBundleVersion = 32; // must match lucee-docs\builders\html\assets\Gruntfile.js _version and server/application.cfc
	application.assetBundleVersion = variables.assetBundleVersion;
	this.assetBundleVersion = variables.assetBundleVersion;

	this.cwd = GetDirectoryFromPath( GetCurrentTemplatePath() )

	this.mappings[ "/api"      ] = this.cwd & "api";
	this.mappings[ "/builders" ] = this.cwd & "builders";
	this.mappings[ "/docs"     ] = this.cwd & "docs";
	this.mappings[ "/import"   ] = this.cwd & "import";
	this.mappings[ "/builds"   ] = this.cwd & "builds";

	systemOutput( "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", true);

	public boolean function onRequest( required string requestedTemplate ) output=true {
		var logger = new api.build.Logger();
		systemOutput( "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", true );

		application.assetBundleVersion = variables.assetBundleVersion;

		include template=arguments.requestedTemplate;

		return true;
	}
}
