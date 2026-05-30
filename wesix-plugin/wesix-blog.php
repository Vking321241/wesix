<?php
/**
 * Plugin Name: WeSix Blog
 * Plugin URI:  https://wesix.io
 * Description: Sistema editorial de blog para pequenos empreendedores. Shortcodes: [wesix_blog] e [wesix_admin].
 * Version:     1.0.0
 * Author:      WeSix
 * Text Domain: wesix-blog
 * License:     GPL-2.0+
 */

defined( 'ABSPATH' ) || exit;

define( 'WESIX_DIR', plugin_dir_path( __FILE__ ) );
define( 'WESIX_URL', plugin_dir_url( __FILE__ ) );
define( 'WESIX_VERSION', '1.0.0' );

require_once WESIX_DIR . 'includes/settings.php';
require_once WESIX_DIR . 'includes/customizer.php';

// ─── Shortcodes ────────────────────────────────────────────────────────────

add_shortcode( 'wesix_blog',  'wesix_blog_shortcode' );
add_shortcode( 'wesix_admin', 'wesix_admin_shortcode' );

function wesix_get_js_config(): array {
    return [
        'adminKey'         => get_option( 'wesix_admin_password', '' ),
        'logoUrl'          => get_theme_mod( 'wesix_logo_url', '' ),
        'siteName'         => get_theme_mod( 'wesix_site_name', 'WeSix' ),
        'coverPlaceholder' => get_theme_mod( 'wesix_cover_placeholder', '' ),
    ];
}

function wesix_blog_shortcode(): string {
    $dist = WESIX_URL . 'assets/dist/';
    wp_enqueue_style(  'wesix-style',   $dist . 'style.css', [],                WESIX_VERSION );
    wp_enqueue_script( 'wesix-blog-js', $dist . 'blog.js',   [ 'wp-element' ], WESIX_VERSION, true );
    wp_localize_script( 'wesix-blog-js', 'wesixConfig', wesix_get_js_config() );
    return '<div id="wesix-blog-root"></div>';
}

function wesix_admin_shortcode(): string {
    $dist = WESIX_URL . 'assets/dist/';
    wp_enqueue_style(  'wesix-style',    $dist . 'style.css', [],                WESIX_VERSION );
    wp_enqueue_script( 'wesix-admin-js', $dist . 'admin.js',  [ 'wp-element' ], WESIX_VERSION, true );
    wp_localize_script( 'wesix-admin-js', 'wesixConfig', wesix_get_js_config() );
    return '<div id="wesix-admin-root"></div>';
}
