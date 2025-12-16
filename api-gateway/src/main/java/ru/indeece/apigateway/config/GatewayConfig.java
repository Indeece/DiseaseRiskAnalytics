package ru.indeece.apigateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.indeece.apigateway.filter.JwtAuthenticationFilter;

import java.util.List;

@Configuration
public class GatewayConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    private static final List<String> PUBLIC_ENDPOINTS = List.of(
            "/auth/register",
            "/auth/signIn",
            "/auth/refresh"
    );

    public GatewayConfig(JwtAuthenticationFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("auth-service", r -> r.path("/auth/**")
                        .filters(f -> f.filter(jwtAuthFilter.apply(
                                new JwtAuthenticationFilter.Config().setPublicEndpoints(PUBLIC_ENDPOINTS)
                        )))
                        .uri("lb://auth-service")
                )

                .route("heart-disease-api", r -> r.path("/api/**")
                        .filters(f -> f.filter(jwtAuthFilter.apply(
                                new JwtAuthenticationFilter.Config().setPublicEndpoints(PUBLIC_ENDPOINTS)
                        )))
                        .uri("lb://heart-disease-api")
                )

                .route("diabetes-api", r -> r.path("/api/**")
                        .filters(f -> f.filter(jwtAuthFilter.apply(
                                new JwtAuthenticationFilter.Config().setPublicEndpoints(PUBLIC_ENDPOINTS)
                        )))
                        .uri("lb://heart-disease-api")
                )

                .build();
    }

}