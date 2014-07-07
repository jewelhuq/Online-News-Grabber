<?php               include_once('Simple/autoloader.php');

                   function wrapWord( $input, $length = 200)
                        {
                          if( strlen($input) <= $length )
                            return $input;

                          $parts = explode(" ", $input);

                          while( strlen( implode(" ", $parts) ) > $length )
                            array_pop($parts);

                          return implode(" ", $parts);
                        }



                        function getData($newspaper_name, $url,$limit=10) {


                            $feed = new SimplePie();
                            $feed->set_feed_url($url);
                            $feed->enable_cache(false);
                            $feed->set_output_encoding('utf-8');
                            $feed->init();
                            print("
                                <div class=\"newsblock\">
                                <div style=\"clear:both\"></div>
                                <h2>$newspaper_name</h2>
                                <ul>"
                            );

                            $i=0;
                            $items = $feed->get_items();
                            foreach ($items as $item) {
                              $i++;


                                $title = $item->get_title();
                                $url   = $item->get_permalink();
                                $desc  = $item->get_description();
								$date  = $item->get_date();

                                  $desc = preg_replace("/<img[^>]+\>/i", "(image) ", $desc);
                                  $desc = strip_tags($desc);
                                  $desc = preg_replace('#(<a.*?>).*?(</a>)#', '', $desc);
                                  $desc = wrapWord($desc,250);
                                  $desc = strtolower($desc);



                                print("<li>
                                    <a rel=\"nofollow\" target=\"_blank\" class=\"itemtitle\" href=\"$url\">
                                    $title<span class=\"item_new\">new</span></a>
                                    <div class=\"tooltip\">$date - $desc
                                    <div class=\"addthis_toolbox addthis_default_style\">
                                    </div></div></li>"
                                );
                                if($i==$limit){
                                break;
                              }

                            }
                            print("
                                  </ul>
                                  <div style=\"clear:both\"></div>
                                  </div>
                                  ");

                        }

                        function setActive($link,$getVal){
                          if($link===$getVal){
                            $text ="current_page_item";
                          }

                          return $text;
                        }


                              function getNews($new_catagory){
                            foreach($new_catagory as $key=>$val){
                              getData("$key", "$val");
        }

      }


                        function menuList($new_catagory,$name){
                          $class_name = setActive($new_catagory,$name);
                          print("<li class=\"$class_name\" ><a href=\"index.php?news=$name\" title=\"$name\">$name</a></li>");
                        }
?>