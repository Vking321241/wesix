<?php
defined( 'ABSPATH' ) || exit;

add_action( 'customize_register', 'wesix_customize_register' );

function wesix_customize_register( WP_Customize_Manager $wp_customize ): void {

    // ─── Panel ────────────────────────────────────────────────────────────
    $wp_customize->add_panel( 'wesix_panel', [
        'title'    => 'WeSix Blog',
        'priority' => 30,
    ] );

    // ─── Section: Identidade ──────────────────────────────────────────────
    $wp_customize->add_section( 'wesix_identity', [
        'title'       => 'Identidade e Logo',
        'description' => 'Configure a marca visual do blog.',
        'panel'       => 'wesix_panel',
        'priority'    => 10,
    ] );

    // Logo
    $wp_customize->add_setting( 'wesix_logo_url', [
        'default'           => '',
        'transport'         => 'refresh',
        'sanitize_callback' => 'esc_url_raw',
    ] );
    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'wesix_logo_url', [
        'label'       => 'Logo do Site',
        'description' => 'Substitui o texto "WeSix.io" na barra de navegação e rodapé. Recomendado: PNG/SVG fundo transparente, altura mínima 40px.',
        'section'     => 'wesix_identity',
    ] ) );

    // Nome / Marca
    $wp_customize->add_setting( 'wesix_site_name', [
        'default'           => 'WeSix',
        'transport'         => 'refresh',
        'sanitize_callback' => 'sanitize_text_field',
    ] );
    $wp_customize->add_control( 'wesix_site_name', [
        'label'       => 'Nome da Marca',
        'description' => 'Texto de branding exibido quando não há logo definida.',
        'section'     => 'wesix_identity',
        'type'        => 'text',
    ] );

    // ─── Section: Página Nossa História ───────────────────────────────────
    $wp_customize->add_section( 'wesix_about', [
        'title'       => 'Página "Nossa História"',
        'description' => 'Imagens exibidas na página Sobre / Nossa História.',
        'panel'       => 'wesix_panel',
        'priority'    => 20,
    ] );

    // Foto do fundador
    $wp_customize->add_setting( 'wesix_founder_photo', [
        'default'           => '',
        'transport'         => 'refresh',
        'sanitize_callback' => 'esc_url_raw',
    ] );
    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'wesix_founder_photo', [
        'label'       => 'Foto do Fundador',
        'description' => 'Aparece no card de perfil na página "Nossa História". Proporção recomendada: 3:4 (retrato).',
        'section'     => 'wesix_about',
    ] ) );
}
