<template>
    <transition name="fade">
        <div class="ebook-slide-contents">
            <div class="slide-contents-search-wrapper">
                <div class="slide-contents-search-input-wrapper">
                    <div class="slide-contents-search-icon">
                        <span class="icon-search"></span>
                    </div>
                    <input class="slide-contents-search-input"
                           type="text"
                           v-model="searchText"
                           @keyup.enter.exact="search"
                           :placeholder="$t('book.searchHint')"
                           @click="showSearchPage"
                           ref="searchInput">
                </div>
                <div class="slide-contents-search-cancel" v-if="searchVisible"
                     @click="hideSearchPage">{{$t('book.cancel')}}
                </div>
            </div>
            <div class="slide-contents-book-wrapper" v-show="!searchVisible">
                <div class="slide-contents-book-img-wrapper">
                    <img :src="cover" class="slide-contents-book-img">
                </div>
                <div class="slide-contents-book-info-wrapper">
                    <div class="slide-contents-book-title">{{metaData.title}}</div>
                    <div class="slide-contents-book-author">{{metaData.creator}}</div>
                </div>
                <div class="slide-contents-book-progress-wrapper">
                    <div class="slide-contents-book-progress">
                        <span class="progress">{{progress + '%'}}</span>
                        <div class="progress-text">{{$t('book.haveRead2')}}</div>
                    </div>
                    <div class="slide-contents-book-time">已读120分钟</div>
                </div>
            </div>
            <scroll class="slide-contents-list" v-show="!searchVisible" :top="156" :bottom="48" rel="scroll">
                <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index">
                    <span class="slide-contents-item-label" :class="{ selected: index === section}"
                          :style="contentItemStyle(item)" @click="onClickSection(item)">{{item.label}}</span>
                    <span class="slide-contents-item-page"></span>
                </div>
            </scroll>
            <scroll class="slide-search-list" :top="66" :bottom="48" v-show="searchVisible">
                <div class="slide-search-item" v-for="(item, index) in searchList" :key="index" v-html="item.excerpt"
                     @click="onClickSearchItem(item, true)"></div>
            </scroll>
        </div>
    </transition>
</template>

<script>
    import {ebookMixin} from "../../utils/mixin";
    import Scroll from '../common/Scroll'
    import {px2rem} from "../../utils/utils";

    export default {
        name: "ebook-slide-content",
        components: {
            Scroll,
        },
        mixins: [ebookMixin],
        data() {
            return {
                searchVisible: false,
                searchList: [],
                searchText: '',
            }
        },

        methods: {

            onClickSearchItem(item, highlight = false) {
                this.hideSearchPage()
                this.display(item.cfi, () => {
                    this.hideTitleAndMenu()
                    highlight && this.book.rendition.annotations.highlight(item.cfi)
                })

            },
            search() {
                this.searchText
                && this.doSearch(this.searchText).then((list) => {

                    this.searchList = list.map(item => ({
                        ...item,
                        excerpt: item.excerpt.replace(new RegExp(this.searchText, 'gm'), `<span class="content-search-text">${this.searchText}</span>`)
                    }))
                })
            },
            onClickSection(item) {
                this.display(item.href, this.hideTitleAndMenu)
            },
            hideSearchPage() {
                this.searchVisible = false
                this.searchText = ''
                this.searchList = []
            },
            showSearchPage() {
                this.searchVisible = true
            },
            contentItemStyle(item) {
                return {
                    marginLeft: `${px2rem(item.level * 15)}`
                }
            },
            doSearch(q) {
                return Promise.all(
                    // this.book.spine.spineItems 返回的 章节（section）
                    this.book.spine.spineItems.map(section => section.load(this.book.load.bind(this.book)).then(section.find.bind(section, q)).finally(section.unload.bind(section)))
                ).then(results => Promise.resolve([].concat.apply([], results))) // [].concat.apply([], results) 将二维数组降维成一维数组
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";

    .ebook-slide-contents {
        width: 100%;
        font-size: 0;

        .slide-contents-search-wrapper {
            display: flex;
            width: 100%;
            height: px2rem(36);
            margin: px2rem(20) 0 px2rem(10) 0;
            padding: 0 px2rem(15);
            box-sizing: border-box;

            .slide-contents-search-input-wrapper {
                flex: 1;
                border-radius: px2rem(3);
                @include center;

                .slide-contents-search-icon {
                    flex: 0 0 px2rem(28);
                    @include center;

                    .icon-search {
                        font-size: px2rem(12);
                    }
                }

                .slide-contents-search-input {
                    flex: 1;
                    width: 100%;
                    height: px2rem(32);
                    font-size: px2rem(14);
                    background: transparent;
                    border: none;

                    &:focus {
                        outline: none;
                    }
                }
            }

            .slide-contents-search-cancel {
                flex: 0 0 px2rem(50);
                font-size: px2rem(14);
                @include right;
            }
        }

        .slide-contents-book-wrapper {
            display: flex;
            width: 100%;
            height: px2rem(90);
            padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
            box-sizing: border-box;

            .slide-contents-book-img-wrapper {
                flex: 0 0 px2rem(45);

                .slide-contents-book-img {
                    width: px2rem(45);
                    height: px2rem(60);
                }
            }

            .slide-contents-book-info-wrapper {
                flex: 1;
                padding: 0 px2rem(10);
                box-sizing: border-box;

                .slide-contents-book-title {
                    font-size: px2rem(14);
                    width: px2rem(153.75);
                    @include ellipsis2(2);
                }

                .slide-contents-book-author {
                    font-size: px2rem(12);
                    @include ellipsis;
                    width: px2rem(153.75);
                    margin-top: px2rem(5);
                }
            }

            .slide-contents-book-progress-wrapper {
                flex: 0 0 px2rem(70);

                .slide-contents-book-progress {
                    .progress {
                        font-size: px2rem(14);
                    }

                    .progrress-text {
                        font-size: px2rem(12);
                    }
                }

                .slide-contents-book-time {
                    font-size: px2rem(12);
                }
            }
        }

        .slide-contents-list {
            padding: 0 px2rem(15);
            box-sizing: border-box;

            .slide-contents-item {
                display: flex;
                padding: px2rem(20) 0;
                box-sizing: border-box; /*//@goon*/
                .slide-contents-item-label {
                    flex: 1;
                    font-size: px2rem(14);
                    @include ellipsis;
                }

                .slide-contents-item-page {
                }
            }
        }

        .slide-search-list {
            width: 100%;
            padding: 0 px2rem(15);
            box-sizing: border-box;

            .slide-search-item {
                font-size: px2rem(14);
                line-height: px2rem(16);
                padding: px2rem(20) 0;
                box-sizing: border-box;
            }
        }
    }
</style>
