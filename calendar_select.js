var yearList = (function () {
	var list = [];
	for(var i=1900; i<2050; i++) {
		list.push(i);
	}
	return list;
})();
var monthList = ['一月份', '二月份', '三月份', '四月份', '五月份', '六月份', '七月份', '八月份', '九月份', '十月份', '十一月份', '十二月份'],
	weekList = ['一', '二', '三', '四', '五', '六', '日'];
var date = new Date(),
	nowYear = date.getFullYear(),
	nowMonth = date.getMonth(),
	nowDay = date.getDate();

function isLeapYear (year) {
	return year%4 === 0 && (year%100 !== 0 || year%400 === 0);
}

Vue.component('calender-selector', {
	template: '<div class="date-selector">\
					<table class="date-table">\
						<thead>\
							<tr class="year-month-selector">\
								<th colspan="3" class="year-selector">\
									<span class="year-pre btn" @click="preYear">&lt;</span>\
									<select v-model="selectedYear">\
										<option v-for="year in yearList" v-bind:value="year">{{ year }}</option>\
									</select>\
									<span class="year-next btn" @click="nextYear">&gt;</span>\
								</th>\
								<th colspan="3" class="month-selector">\
									<span class="month-pre btn" @click="preMonth">&lt;</span>\
									<select v-model="selectedMonth">\
										<option v-for="(month,index) in monthList" :value="index">{{ month }}</option>\
									</select>\
									<span class="month-next btn" @click="nextMonth">&gt;</span>\
								</th>\
								<th>\
								</th>\
							</tr>\
							<tr class="week-list">\
								<td v-for="week in weekList">{{ week }}</td>\
							</tr>\
						</thead>\
						<tbody class="date-list">\
							<tr v-for="i in 5">\
								<td v-for="date in dateArr[i-1]" :class="{today: isToday(date)}" v-on:click="handleClick(date)">{{ date }}</td>\
							</tr>\
						</tbody>\
					</table>\
				</div>',
	data: function () {
		return {
			selectedYear: yearList[nowYear-1900],
			selectedMonth: nowMonth,
			selectedDay: nowDay,
			monthList: monthList,
			yearList: yearList,
			weekList: weekList
		}
	},
	methods: {
		preYear: function () {
			this.selectedYear = this.selectedYear>1900 ? this.selectedYear-1 : this.selectedYear;
		},
		preMonth: function () {
			if (this.selectedMonth > 0) {
				this.selectedMonth--;
			} else {
				this.selectedMonth = 11;
				this.selectedYear--;
			}
		},
		nextYear: function () {
			this.selectedYear = this.selectedYear<2050 ? this.selectedYear+1 : this.selectedYear;
		},
		nextMonth: function () {
			if (this.selectedMonth < 11) {
				this.selectedMonth++;
			} else {
				this.selectedMonth = 0;
				this.selectedYear++;
			}
		},
		isToday: function (date) {
			return this.selectedYear === nowYear && this.selectedMonth === nowMonth && nowDay === date;
		},
		handleClick: function (date) {
			if (date) {
				this.selectedDay = date;
				this.$emit('choose', (this.selectedYear + '-' + (this.selectedMonth+1) + '-' + this.selectedDay));
			}
		}
	},
	computed: {
		dateArr: function () {
			var date = new Date(parseInt(this.selectedYear)+'-'+(parseInt(this.selectedMonth)+1)+'');
			var LONG_MONTH = [0, 2, 4, 6, 7, 9, 11],
				SHORT_MONTH = [1, 3, 5, 8, 10];
			var dayNums = 0,
				month = date.getMonth(),
				firstDay = date.getDay() > 0 ? (date.getDay()-1) : 6,
				arr = [];
			if (LONG_MONTH.indexOf(month) > -1) {
				dayNums = 31;
			} else if (SHORT_MONTH.indexOf(month) > -1) {
				dayNums = month !== 1 ? 30 : isLeapYear(date.getFullYear()) ? 29 : 28;
			}
			var num = 1;
			for (var i=0; i<dayNums+firstDay; i++) {
				arr.push(i<firstDay ? ' ' : num++);
			}
			arr.length = 35;
			return [
				arr.slice(0,7),
				arr.slice(7,14),
				arr.slice(14,21),
				arr.slice(21,28),
				arr.slice(28,35)
			];
		}
	}
});

var vm = new Vue({
	el: '#calendarContainer',
	data: {
		date: nowYear + '-' + (nowMonth+1) + '-' + nowDay,
		isCallendarDisplay: false
	},
	methods: {
		dateChange: function (date) {
			this.date = date;
			this.isCallendarDisplay = false;
		},
		handleInputFocus: function () {
			this.isCallendarDisplay = true;
		},
		handleInputBlur: function () {
			this.isCallendarDisplay = false;
		}
	}
});