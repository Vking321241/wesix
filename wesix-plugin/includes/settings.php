<?php
defined( 'ABSPATH' ) || exit;

add_action( 'admin_menu',  'wesix_register_settings_page' );
add_action( 'admin_init',  'wesix_register_settings' );

function wesix_register_settings_page(): void {
    add_options_page(
        'WeSix Blog — Configurações',
        'WeSix Blog',
        'manage_options',
        'wesix-blog-settings',
        'wesix_render_settings_page'
    );
}

function wesix_register_settings(): void {
    register_setting( 'wesix_group', 'wesix_admin_password', [
        'sanitize_callback' => 'sanitize_text_field',
        'default'           => '',
    ] );
}

function wesix_render_settings_page(): void {
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }
    ?>
    <div class="wrap">
        <h1>⚙️ WeSix Blog — Configurações</h1>
        <p>Configure a senha do painel editorial e os dados do blog.</p>
        <hr>

        <form method="post" action="options.php">
            <?php settings_fields( 'wesix_group' ); ?>
            <table class="form-table" role="presentation">
                <tr>
                    <th scope="row">
                        <label for="wesix_admin_password">Senha do Painel Admin</label>
                    </th>
                    <td>
                        <input
                            type="password"
                            id="wesix_admin_password"
                            name="wesix_admin_password"
                            value="<?php echo esc_attr( get_option( 'wesix_admin_password', '' ) ); ?>"
                            class="regular-text"
                            autocomplete="new-password"
                        />
                        <p class="description">
                            Senha de acesso ao painel editorial via shortcode <code>[wesix_admin]</code>.<br>
                            Deixe em branco para desabilitar o acesso.
                        </p>
                    </td>
                </tr>
            </table>
            <?php submit_button( 'Salvar Configurações' ); ?>
        </form>

        <hr>
        <h2>Como usar</h2>
        <table class="widefat fixed">
            <thead>
                <tr><th>Shortcode</th><th>Descrição</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>[wesix_blog]</code></td>
                    <td>Exibe o blog público com listagem de posts, busca e categorias.</td>
                </tr>
                <tr>
                    <td><code>[wesix_admin]</code></td>
                    <td>Exibe o painel editorial protegido por senha para criar e gerenciar posts.</td>
                </tr>
            </tbody>
        </table>
        <p><strong>Dica:</strong> Para configurar a logo e as imagens do site, acesse
            <a href="<?php echo esc_url( admin_url( 'customize.php' ) ); ?>">Aparência → Personalizar → WeSix Blog</a>.
        </p>
    </div>
    <?php
}
