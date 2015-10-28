/**
 * Created on 27.10.2015.
 */
define([], function(){
    function BufferedScope(p) {
        this.buildInterface = function (outer) {

            outer['wrapFunction'] = f;

            outer['makeObservable'] = f;

            outer['makeComputed'] = f;
        }
    }
});
