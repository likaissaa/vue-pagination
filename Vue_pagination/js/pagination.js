/**
 * Create with WebStorm
 * Author: Daxiu Huang
 * CreateTime: 2017/9/6 10:21
 */
//分页组件V
Vue.component('navigation',{
    template: `
    <div class="row">
    		<div class="span6">
		    <div class="pagination text-right">
		        <ul>
		            <li :class="{\'disabled\':curPage==1}">
		                <a href="javascript:;" @click="goPage(curPage==1?1:curPage-1)" aria-label="Previous">
		                    <span aria-hidden="true">&laquo;</span>
		                </a>
		            </li>
		            <li v-for="page in showPageBtn" :class="{\'active\':page==curPage}" track-by="$index">
		                <a href="javascript:;" v-if="page" @click="goPage(page)">{{page}}</a>
		                <a href="javascript:;" v-else>···</a>
		            </li>
		            <li :class="{\'disabled\':curPage==pages}">
		                <a href="javascript:;" @click="goPage(curPage==pages?pages:curPage+1)" aria-label="Next">
		                    <span aria-hidden="true">&raquo;</span>
		                </a>
		            </li>
		        </ul>
		    </div>
	    </div>
	    <div class="span3 text-left">
	    		<div class="pagination">
	  			第<input type="text" style="width:30px;" class="text-center" v-bind:value="curPage" v-on:keyup.enter="getPage($event.target.value)" @/>页，共 <input type="text" class="text-center"  style="width:30px;" v-model="pages" disabled />页,共{{all}}条
	  		</div>
	    </div>
    </div>`,
    props:["pages","current","all"],
    data(){
        return{
            curPage:1
        }
    },
    methods:{
		updateVal(val){
			return parseInt(val)
		}
    },
    computed: {
        showPageBtn() {
            let pageNum = this.pages;
            let index = this.curPage;
            let arr = [];
            if (pageNum <= 5) {
                for (let i = 1; i <= pageNum; i++) {
                    arr.push(i)
                }
                return arr
            }
            if (index <= 2) return [1, 2, 3, 0, pageNum];
            if (index >= pageNum - 1) return [1, 0, pageNum - 2, pageNum - 1, pageNum];
            if (index === 3) return [1, 2, 3, 4, 0, pageNum];
            if (index === pageNum - 2) return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
            return [1, 0, index - 1, index, index + 1, 0, pageNum];
        }
    },
    methods: {
        goPage(page) {
            if (page != this.curPage) {
                console.log(page);
                this.curPage = page;
                this.$emit('navpage', this.curPage);
            }else{
            		
                console.log('Already in the current page');
                return;
            }
        },
        getPage(data){
        		var number=parseInt(data);
        		this.goPage(number)
        }
    }
});