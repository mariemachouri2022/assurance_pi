package com.example.apiGateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}

	@Bean
	public RouteLocator gatewayRoutes(RouteLocatorBuilder builder){
		return builder.routes()
				.route("Contract-Service",r->r.path("/contracts/**")
						.uri("lb://Contract-Service") )
				.route("Credit-Service", r->r.path("/credits/**")
						.uri("lb://Credit-Service") )
				.route("Devis-Service", r->r.path("/devis/**")
						.uri("lb://Devis-Service") )
				.route("Product-Service", r->r.path("/products/**")
						.uri("lb://Product-Service") )
				.route("Sinistre-Service", r->r.path("/sinistres/**")
						.uri("lb://Sinistre-Service") )
				.route("User-Service", r->r.path("/users/**")
						.uri("lb://User-Service") )
				.build();
	}
}
