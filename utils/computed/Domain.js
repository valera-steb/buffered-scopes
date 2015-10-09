/**
 * Created on 29.09.2015.
 */
define(['require_for_di-lite/privateScopeWrapper', './DomainCore'], function(wrapper, core){
    return new wrapper('ComputedDomain', core);
});
