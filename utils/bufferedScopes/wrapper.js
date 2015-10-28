/**
 * Created on 27.10.2015.
 */
define(['require_for_di-lite', 'require_for_di-lite/registrationUtils',
    './IDomain', './ParamsWrapper'], function (CtxProvider, register, IDomainType, ParamsWrapper) {
    var iDomain,
        paramsWrapper;

    (new CtxProvider)['buildCtx']([], function (context) {
        context['addTypes']([IDomainType, ParamsWrapper]);
        iDomain = context.get('BufferedScopes');
        paramsWrapper = context.get('ParamsWrapper');
    });

    function BufferedScopeWrapper(componentName, componentCore, publicConfig) {

        var config = {
                name: BufferedScope.component = componentName,
                c: BufferedScope,
                strategy: di.strategy.proto
            },
            errors = {
                noParentCtxForChild: function (params) {
                    if (params && !params.ctx)
                        return;

                    throw new Error('Child scope ask for parent scope, but has no in params');
                },
                noInterfaceBuilder: function (root) {
                    //if (root && root['buildInterface'] &&
                    //    utils.isFunction(root['buildInterface']))
                    //    return;
                    //
                    //throw new Error('Child component should provide buildInterface function');
                }
            };


        function BufferedScope(params) {
            var self = this;

            if (publicConfig && publicConfig['dependencies'])
                this['dependencies'] = publicConfig['dependencies'];

            (new CtxProvider)['buildCtx']([], function (ctx) {

                ctx['addTypes']([componentCore]);
                var scope = iDomain['buildScope']();
                ctx.register('BufferedScope').object(scope);

                if (params && params['swappers'] && params['swappers'][config.name])
                    params['swappers'][config.name](null, ctx);

                if (publicConfig && publicConfig['getScope']) {
                    errors.noParentCtxForChild(params);
                    ctx.register('parentScope', params.ctx);
                }


                ctx.initialize();

                var root = ctx.get(componentCore.name);
                errors.noInterfaceBuilder(root);
                root['buildInterface'](self, scope);
                paramsWrapper.wrapInterface(self, scope);
            });
        }


        register.settings(config, publicConfig, 'strategy');
        register.settings(config, publicConfig, 'getScope');
        register.settings(config, publicConfig, 'subTypes');

        return config;
    }

    BufferedScopeWrapper['domain'] = iDomain;


    return BufferedScopeWrapper;
});
