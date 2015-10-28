/**
 * Created on 27.10.2015.
 */
define(['require_for_di-lite/privateScopeWrapper'], function(Wrapper){

    function f(){};


    function IDomain(p) {
        this.buildInterface = function (outer) {

            outer['buildScope'] = function () {
                return {};
            };

            outer['isFunction'] = f;

            outer['isObservable'] = f;

            outer['isComputed'] = f;
        }
    }

    return new Wrapper('BufferedScopes', {
        'name': 'IDomain',
        'c': IDomain,
        'getScope': true
    });
});
