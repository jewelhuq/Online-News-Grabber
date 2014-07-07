<?php

include  "list.php";
include  "library.php";
include  "config.php";

$news           = isset($_GET["news"])?$_GET["news"] : "Home";

    if($news=="IT" or $news=="Entertainment" or $news=="Sports" or $news=="Science" or $news=="Home"){
        $new_catagory    = $news;
    }
    else{
        $new_catagory    = "Home";
    }






$cache_file     = $cache_folder.$new_catagory.$cache_ext; // construct a cache file


if ( file_exists($cache_file) && time() - $cache_time < filemtime($cache_file)) { //check Cache exist and it's not expired.
    ob_start('ob_gzhandler'); //Turn on output buffering, "ob_gzhandler" for the compressed page with gzip.
    readfile($cache_file); //read Cache file
    echo '<!-- cached page - '.date('l jS \of F Y h:i:s A', filemtime($cache_file)).', Page : '.$dynamic_url.' -->';
    ob_end_flush();
    exit(); //no need to proceed further, exit the flow.
}

//Turn on output buffering with gzip compression.
ob_start('ob_gzhandler');
######## Your Website Content Starts Below #########





$title    = $new_catagory."_title";
$desc     = $new_catagory."_desc";
$keyword  = $new_catagory."_keyword";


$page_title     = $$title;
$page_desc      = $$desc;
$page_keyword   = $$keyword;


?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-US"><head profile="http://gmpg.org/xfn/11">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title><?php print("$page_title"); ?></title>
        <meta name="keyword"     content="<?php print("$page_keyword"); ?>" />
        <meta name="description" content="<?php print("$page_desc"); ?>" />
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/script.js"></script>
        <link rel="stylesheet" href="css/style.css" type="text/css" media="all" />
        </head>

<body class="home blog">


        <div id="top">


            <h1 align='center'><?php print("$website_headlines");?></h1>
            <div class="content">

            </div>





            <div class="top-menu-container">
                <div class="content">
                    <ul class="menu">
                    <?php
                    foreach($menu_name as $value){
                   menuList($new_catagory,$value);
                    }
                    ?>
                   </ul>
                </div>
            </div>

            <div class="content bodycontent">
                <div id="post-1">
                    <div class="news-entry">



                        <?php


                        getNews ($$new_catagory);
                        ?>

	</div>

	           
                        <div style="clear:both"></div>



                        <div style="clear:both"></div>

                        <div id="footer">
                            <a href="index.php" title="Home">&copy; your company </a>
                        </div><!-- END FOOTER -->

                    </div><!-- END CONTENT -->

                    <script type="text/javascript">
                        $(".itemtitle").tooltip({
                            position: 'bottom center',
                            offset: [0,19]
                        });

                        $(".mediaitemtitle").tooltip({
                            position: 'bottom center',
                            offset: [-16,0]
                        });
                    </script>


            </div>

            <?php
            if($activate_google_anlytics==1){
              ?><script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', '<?php print("$activate_google_code"); ?> ']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
<?
            }
                ?>


                    

                    </body>

                    </html>


                    <?php
######## Your Website Content Ends here #########

if (!is_dir($cache_folder)) { //create a new folder if we need to
    mkdir($cache_folder);
}
if(!$ignore){
    $fp = fopen($cache_file, 'w');  //open file for writing
    fwrite($fp, ob_get_contents()); //write contents of the output buffer in Cache file
    fclose($fp); //Close file pointer
}
ob_end_flush(); //Flush and turn off output buffering

?>
