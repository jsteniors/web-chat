function encodes(data) {
    return unescape(encodeURIComponent(data));
}

function decodes(data) {
    if(data.msg)
        return decodeURIComponent(escape(data.msg));
    else
        return data.content;
}