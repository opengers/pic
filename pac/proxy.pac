var FindProxyForURL = function(init, profiles) {
    return function(url, host) {
        "use strict";
        var result = init, scheme = url.substr(0, url.indexOf(":"));
        do {
            result = profiles[result];
            if (typeof result === "function") result = result(url, host, scheme);
        } while (typeof result !== "string" || result.charCodeAt(0) === 43);
        return result;
    };
}("+auto switch", {
    "+auto switch": "+__ruleListOf_auto switch",
    "+__ruleListOf_auto switch": function(url, host, scheme) {
        "use strict";
        if (/(?:^|\.)glass8\.eu$/.test(host)) return "+proxy";
        if (/(?:^|\.)glype\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)yinxiang\.com$/.test(host)) return "+proxy";
        return "DIRECT";
    },
    "+proxy": function(url, host, scheme) {
        "use strict";
        if (/^127\.0\.0\.1$/.test(host) || /^::1$/.test(host) || /^localhost$/.test(host)) return "DIRECT";
        return "PROXY 127.0.0.1:1883";
    }
});
