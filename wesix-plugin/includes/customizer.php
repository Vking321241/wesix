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

    // Logo (imagem)
    $wp_customize->add_setting( 'wesix_logo_url', [
        'default'           => '',
        'transport'         => 'refresh',
        'sanitize_callback' => 'esc_url_raw',
    ] );
    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'wesix_logo_url', [
        'label'       => 'Logo do Site',
        'description' => 'Substitui o texto "WeSix.io" na barra de navegação. Recomendado: PNG/SVG fundo transparente, altura mínima 40px.',
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
        'description' => 'Aparece no rodapé e em outros textos de branding quando não há logo definida.',
        'section'     => 'wesix_identity',
        'type'        => 'text',
    ] );

    // ─── Section: Imagens ─────────────────────────────────────────────────
    $wp_customize->add_section( 'wesix_images', [
        'title'       => 'Imagens do Site',
        'description' => 'Substitua as imagens padrão exibidas no blog.',
        'panel'       => 'wesix_panel',
        'priority'    => 20,
    ] );

    // Imagem de capa padrão dos posts
    $wp_customize->add_setting( 'wesix_cover_placeholder', [
        'default'           => '',
        'transport'         => 'refresh',
        'sanitize_callback' => 'esc_url_raw',
    ] );
    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'wesix_cover_placeholder', [
        'label'       => 'Imagem Padrão de Capa',
        'description' => 'Exibida quando um post não tem imagem de capa definida. Proporção recomendada: 16:9.',
        'section'     => 'wesix_images',
    ] ) );
}
