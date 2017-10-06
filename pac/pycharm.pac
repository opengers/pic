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
}("+AUTO", {
    "+AUTO": function(url, host, scheme) {
        "use strict";
        if (host[host.length - 1] >= 0 && isInNet(host, "172.16.200.0", "255.255.248.0")) return "+VPN";
        return "DIRECT";
    },
    "+VPN": function(url, host, scheme) {
        "use strict";
        if (host === "127.0.0.1" || host === "::1" || host.indexOf(".") < 0) return "DIRECT";
        return "SOCKS5 127.0.0.1:9001";
    },
});