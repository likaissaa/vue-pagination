/**
 * Create with idea
 * Author: chenrong
 * CreateTime: 2018/9/25 11:18
 */
//分页组件V
Vue.component('page2', {
	template: `
     <div class="pagination">
        <ul class="pagination">
            <li>
                <select :value="pageable.size" @change="onSelectedChange">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </li>
            <li :class="{ disabled: pageable.first }">
                <a href="javascript:void(0)" @click="first">
                    <span aria-hidden="true">首页</span>
                </a>
            </li>
            <li :class="{ disabled: pageable.first }">
                <a href="javascript:void(0)" @click="prev">
                    <span aria-hidden="true">上一页</span>
                </a>
            </li>
            <li :class="{ disabled: pageable.last }">
                <a href="javascript:void(0)" @click="next">
                    <span aria-hidden="true">下一页</span>
                </a>
            </li>
            <li :class="{ disabled: pageable.last }">
                <a href="javascript:void(0)" @click="last">
                    <span aria-hidden="true">尾页</span>
                </a>
            </li>
            <li>
                &nbsp;&nbsp;{{ pageable.totalPages == 0 ? 0 : pageable.number + 1 }}/{{ pageable.totalPages }}页，
                {{ pageable.totalElements }}条记录，到&nbsp;<input @keyup.enter="jump">&nbsp;页
            </li>
        </ul>
    </div>
    `,
	props: {
		pageable: {
			type: Object,
			required: true
		}
	},
	data() {
		return {

		}
	},
	methods: {
		changePage: function(page) {
			if(this.pageable.number !== page) {
				this.$emit('on-page-change', page, this.pageable.size);
			}
		},
		onSelectedChange: function(event) {
			var size = event.target.value;
			if(this.pageable.size !== size) {
				var page = Math.floor(this.pageable.number * this.pageable.size / size);
				this.$emit('on-page-change', page, size);
			}
		},
		first: function () {
                this.changePage(0);
            },
            prev: function () {
                this.changePage(Math.max(this.pageable.number - 1, 0));
            },
            next: function () {
                this.changePage(Math.min(this.pageable.number + 1, this.pageable.totalPages - 1));
            },
            last: function () {
                this.changePage(this.pageable.totalPages - 1);
            },
            jump: function (e) {
                var input = e.target;
                var number = Number(input.value);
                if (!isNaN(number) && number > 0 && number <= this.pageable.totalPages) {
                    this.changePage(number - 1);
                    input.select(); // 全选功能
                } else {
                    input.value = '';
                }
            }
	}
});