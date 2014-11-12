---
layout: docs
title: History
permalink: /docs/history/
prev_section: contributing
---

## 0.1.0 / 2013-12-18

### Major Enhancements
- Add 'Ghost' importer ([#100]({{ site.repository }}/issues/100))
- Add 'Behance' importer ([#46]({{ site.repository }}/issues/46), [#104]({{ site.repository }}/issues/104))
- Add the optional ability to include images in a posterous migration ([#5]({{ site.repository }}/issues/5))
- Posterous archive (unzipped directory) importer added ([#12]({{ site.repository }}/issues/12))
- Improve MovableType importer ([#13]({{ site.repository }}/issues/13))
- Add an importer for Google Reader blog exports ([#36]({{ site.repository }}/issues/36))
- Remove dependency on html2text in the tumblr importer ([#33]({{ site.repository }}/issues/33))
- Add the ability to import .jrnl files ([#51]({{ site.repository }}/issues/51))
- Handle missing gems a bit more gracefully ([#59]({{ site.repository }}/issues/59))

### Minor Enhancements
- Add date and redirection pages for blogs imported from Tumblr ([#54]({{ site.repository }}/issues/54))
- Various Tumblr Enhancements ([#27]({{ site.repository }}/issues/27))
- Adding tags to Typo and forcing their encoding to UTF-8 ([#11]({{ site.repository }}/issues/11))
- S9Y Importer: specify data source using --source option ([#18]({{ site.repository }}/issues/18))
- Add taxonomy (`tags`) to Drupal6 migration ([#15]({{ site.repository }}/issues/15))
- Differentiate between categories and tags in the WordpressDotCom
    importer ([#31]({{ site.repository }}/issues/31))
- Use tumblr slug for post is available, use that instead ([#39]({{ site.repository }}/issues/39), [#40]({{ site.repository }}/issues/40))
- Drupal 7 importer should use latest revision of a post ([#38]({{ site.repository }}/issues/38))
- Improve the handling of tags in the Drupal 6 importer. Tags with
    spaces are handled now and the importer doesn't eat tags anymore. ([#42]({{ site.repository }}/issues/42))
- Upgrade to `jekyll ~> 1.3` and `safe_yaml ~> 0.9.7` 
- Add license to gemspec ([#83]({{ site.repository }}/issues/83))
- Add an `Importer.run` method for easy invocation ([#88]({{ site.repository }}/issues/88))

### Bug Fixes
- Remove usage of `Hash#at` in Tumblr importer ([#14]({{ site.repository }}/issues/14))
- Force encoding of Drupal 6.x titles to UTF-8 ([#22]({{ site.repository }}/issues/22))
- Update wordpressdotcom.rb to use its method parameter correctly ([#24]({{ site.repository }}/issues/24))
- Use MySQL2 adapter for WordPress importer to fix broken front-matter ([#20]({{ site.repository }}/issues/20))
- Fix WordPress import initialize parameters due to new Jekyll setup ([#19]({{ site.repository }}/issues/19))
- Fixed misspelling in method name ([#17]({{ site.repository }}/issues/17))
- Fix Drupal 7 importer so it compares node ID's properly between `node` and
    `field_data_body` tables ([#38]({{ site.repository }}/issues/38))
- Fix prefix replacement for Drupal6 ([#41]({{ site.repository }}/issues/41))
- Fix an exception when a Movable Type blog did not have additional
    entry text ([#45]({{ site.repository }}/issues/45))
- Create `_layouts/` before writing refresh.html in Drupal migrators ([#48]({{ site.repository }}/issues/48))
- Fix bug where post date in `MT` importer was not imported for older versions
    of MT sites ([#62]({{ site.repository }}/issues/62))
- Fix interface of importers' `#process` method ([#69]({{ site.repository }}/issues/69))
- RSS importer should specify `--source` option ([#81]({{ site.repository }}/issues/81))
- Fix fetching of parameters from options hash ([#86]({{ site.repository }}/issues/86))
- Drupal6: Fix NoMethodError on untagged post ([#93]({{ site.repository }}/issues/93))
- S9Y: Use RSS parser from `rss` package, not the RSS importer ([#102]({{ site.repository }}/issues/102))
- Support as much of the current Commander interface as possible ([#103]({{ site.repository }}/issues/103))

### Site Enhancements
- Add the site ([#87]({{ site.repository }}/issues/87))

### Development Fixes
- Update usage docs in RSS importer ([#35]({{ site.repository }}/issues/35))
- Added initial version of a test case for Tumblr ([#43]({{ site.repository }}/issues/43))
- Remove some outdated comments in the Drupal migrators ([#50]({{ site.repository }}/issues/50))
- Update the README to be more informative ([#52]({{ site.repository }}/issues/52))
- Add comment to Wordpress importer on how to install mysql with
    MacPorts ([#56]({{ site.repository }}/issues/56))
- Correcting the homepage URL so links from rubygems.org will work ([#63]({{ site.repository }}/issues/63))
