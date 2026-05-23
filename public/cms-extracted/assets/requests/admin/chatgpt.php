<?php
if (!defined('R_PILOT')) {
    exit();
}

$llm_provider = isset($_POST['llm_provider']) ? mysqli_real_escape_string($GameMonetizeConnect, trim($_POST['llm_provider'])) : 'openai';

$openai_api_key = isset($_POST['openai_api_key']) ? mysqli_real_escape_string($GameMonetizeConnect, trim($_POST['openai_api_key'])) : '';
$deepseek_api_key = isset($_POST['deepseek_api_key']) ? mysqli_real_escape_string($GameMonetizeConnect, trim($_POST['deepseek_api_key'])) : '';
$mimo_api_key = isset($_POST['mimo_api_key']) ? mysqli_real_escape_string($GameMonetizeConnect, trim($_POST['mimo_api_key'])) : '';
$gemini_api_key = isset($_POST['gemini_api_key']) ? mysqli_real_escape_string($GameMonetizeConnect, trim($_POST['gemini_api_key'])) : '';
$openrouter_api_key = isset($_POST['openrouter_api_key']) ? mysqli_real_escape_string($GameMonetizeConnect, trim($_POST['openrouter_api_key'])) : '';

$template_game = isset($_POST['template_game']) ? mysqli_real_escape_string($GameMonetizeConnect, trim($_POST['template_game'])) : '';
$template_category = isset($_POST['template_category']) ? mysqli_real_escape_string($GameMonetizeConnect, trim($_POST['template_category'])) : '';
$template_tags = isset($_POST['template_tags']) ? mysqli_real_escape_string($GameMonetizeConnect, trim($_POST['template_tags'])) : '';
$template_footer = isset($_POST['template_footer']) ? mysqli_real_escape_string($GameMonetizeConnect, trim($_POST['template_footer'])) : '';
$template_blog = isset($_POST['template_blog']) ? mysqli_real_escape_string($GameMonetizeConnect, trim($_POST['template_blog'])) : '';
$template_blog_tag = isset($_POST['template_blog_tag']) ? mysqli_real_escape_string($GameMonetizeConnect, trim($_POST['template_blog_tag'])) : '';
$template_blog_title = isset($_POST['template_blog_title']) ? mysqli_real_escape_string($GameMonetizeConnect, trim($_POST['template_blog_title'])) : '';
$template_blog_related_box = isset($_POST['template_blog_related_box']) ? mysqli_real_escape_string($GameMonetizeConnect, trim($_POST['template_blog_related_box'])) : '';

$random_words_before_tags = isset($_POST['random_words_before_tags']) ? mysqli_real_escape_string($GameMonetizeConnect, trim($_POST['random_words_before_tags'])) : '';
$random_words_after_tags = isset($_POST['random_words_after_tags']) ? mysqli_real_escape_string($GameMonetizeConnect, trim($_POST['random_words_after_tags'])) : '';
$chatgpt_model = isset($_POST['chatgpt_model']) ? mysqli_real_escape_string($GameMonetizeConnect, trim($_POST['chatgpt_model'])) : '';
$maximum_words = isset($_POST['maximum_words']) ? (int) $_POST['maximum_words'] : 0;
$rewrite_old_games_limit = isset($_POST['rewrite_old_games_limit']) ? (int) $_POST['rewrite_old_games_limit'] : 1;

$GameMonetizeConnect->query("UPDATE " . CHATGPT . " 
    SET llm_provider='$llm_provider',
    openai_api_key='$openai_api_key',
    deepseek_api_key='$deepseek_api_key',
    mimo_api_key='$mimo_api_key',
    gemini_api_key='$gemini_api_key',
    openrouter_api_key='$openrouter_api_key',
    template_game='$template_game',
    template_category='$template_category',
    template_tags='$template_tags',
    template_footer='$template_footer',
    template_blog='$template_blog',
    template_blog_tag='$template_blog_tag',
    template_blog_title='$template_blog_title',
    template_blog_related_box='$template_blog_related_box',
    random_words_before_tags='$random_words_before_tags',
    random_words_after_tags='$random_words_after_tags',
    chatgpt_model='$chatgpt_model',
    maximum_words='$maximum_words',
    rewrite_old_games_limit='$rewrite_old_games_limit'
    WHERE id='1'
") or die(mysqli_error($GameMonetizeConnect));

$data['status'] = 200;
$data['success_message'] = $lang['chatgpt_saved'];