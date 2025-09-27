package ru.indeece.apigateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import ru.indeece.apigateway.model.Token;
import ru.indeece.apigateway.security.JwtService;

import java.util.List;

@Component
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory<JwtAuthenticationFilter.Config> {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    public static class Config {
        private List<String> publicEndpoints;
        public List<String> getPublicEndpoints() {
            return publicEndpoints;
        }
        public Config setPublicEndpoints(List<String> publicEndpoints) {
            this.publicEndpoints = publicEndpoints;
            return this;
        }
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String path = exchange.getRequest().getURI().getPath();
            if (config != null && config.getPublicEndpoints().stream().anyMatch(path::startsWith)) {
                return chain.filter(exchange);
            }

            String authorizationHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
            if (Token.isBearerToken(authorizationHeader)) {
                String jwt = Token.getJwt(authorizationHeader);

                if (jwtService.validateToken(jwt)) {
                    return chain.filter(exchange);
                } else {
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                }
            }

            return chain.filter(exchange);
        };
    }
}
