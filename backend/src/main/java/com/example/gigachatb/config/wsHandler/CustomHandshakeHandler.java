package com.example.gigachatb.config.wsHandler;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;

public class CustomHandshakeHandler extends DefaultHandshakeHandler {


    @Override
    public Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {
        Principal principal = request.getPrincipal();
        if (principal == null) {

            String uniqueID = request.getHeaders().get("id").get(0);
            if (uniqueID != null)
                principal = new StompPrincipal(uniqueID);
        }
        return principal;
    }
}
