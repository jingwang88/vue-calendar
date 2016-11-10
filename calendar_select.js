var yearList = (function () {
	var list = [];
	for(var i=1900; i<2050; i++) {
		list.push(i);
	}
	return list;
})();

Vue.component('calendar-selector', {
	template: '\
				<div class="date-selector">\
					<table class="date-table">\
						<thead>\
							<tr class="year-month-selector">\
								<th colspan="3" class="year-selector">\
									<span class="year-pre btn">&lt;</span>\
									<select>\
										<option v-for="year in yearList">{{ year }}</option>\
									</select>\
									<span class="year-next btn">&gt;</span>\
								</th>\
								<th colspan="3" class="month-selector">\
									<span class="month-pre btn">&lt;</span>\
									<select>\
										<option v-for="month in monthList">{{ month }}</option>\
									</select>\
									<span class="month-next btn">&gt;</span>\
								</th>\
								<th>\
								</th>\
							</tr>\
							<tr class="week-list">\
								<td v-for="week in weekList">{{ week }}</td>\
							</tr>\
						</thead>\
						<tbody class="date-list">\
							<tr>\
								<td>1</td>\
								<td>2</td>\
								<td>3</td>\
								<td>4</td>\
								<td>5</td>\
								<td>6</td>\
								<td>7</td>\
							</tr>\
							<tr>\
								<td>8</td>\
								<td>9</td>\
								<td>10</td>\
								<td>11</td>\
								<td>12</td>\
								<td>13</td>\
								<td>14</td>\
							</tr>\
							<tr>\
								<td>15</td>\
								<td>16</td>\
								<td>17</td>\
								<td>18</td>\
								<td>19</td>\
								<td>20</td>\
								<td>21</td>\
							</tr>\
							<tr>\
								<td>22</td>\
								<td>23</td>\
								<td>24</td>\
								<td>25</td>\
								<td>26</td>\
								<td>27</td>\
								<td>28</td>\
							</tr>\
							<tr>\
								<td>29</td>\
								<td>30</td>\
								<td>31</td>\
								<td>4</td>\
								<td>5</td>\
								<td>6</td>\
								<td>7</td>\
							</tr>\
							<tr>\
								<td>1</td>\
								<td>2</td>\
								<td>3</td>\
								<td>4</td>\
								<td>5</td>\
								<td>6</td>\
								<td>7</td>\
							</tr>\
						</tbody>\
					</table>\
				</div>\
				',
	data: function () {
		return {
			monthList: ['一月份', '二月份', '三月份', '四月份', '五月份', '六月份', '七月份', '八月份', '九月份', '十月份', '十一月份', '十二月份'],
			yearList: yearList,
			weekList: ['一', '二', '三', '四', '五', '六', '日']
		}
	}
});

new Vue({
	el: '#calendarContainer'
});