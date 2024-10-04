package com.reserva.ReservaApi.controller;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Permite todas as rotas da API
                .allowedOrigins("http://127.0.0.1:5500", "http://localhost:5500")  // Permite os domínios do front-end
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Métodos HTTP permitidos
                .allowedHeaders("*")  // Permite todos os cabeçalhos
                .allowCredentials(true);  // Permite envio de cookies, se necessário
    }
}
