require.config({
    paths: {
        "domReady": "/static/js/domReady",
        "angular": "/static/js/angular",
        "angular-ui-router": "/static/js/angular-ui-router.min"
    },
    shim: {
        "angular": {
            exports: "angular"
        },
        "angular-ui-router": {
            deps: ["angular"]
        }
    },
    deps: ['./bootstrap']
});
