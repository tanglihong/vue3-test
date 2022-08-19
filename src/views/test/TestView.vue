<template>
  <div class="container">
    <van-field
      readonly
      clickable
      label="年份"
      v-model="year"
      placeholder="选择年份"
      @click="showYear = true"
    />
    <van-popup v-model:show="showYear" round position="bottom">
      <van-picker
        show-toolbar
        :columns="yearSkyLand"
        @cancel="showYear = false"
        @confirm="confirmYear"
      />
    </van-popup>
    <van-field
      readonly
      clickable
      label="月份"
      v-model="monthDay"
      placeholder="选择月份"
      @click="showMonth = true"
    />
    <van-popup v-model:show="showMonth" round position="bottom">
      <van-picker
        show-toolbar
        :columns="monthDayList"
        @cancel="showMonth = false"
        @confirm="confirmMonthDay"
      />
    </van-popup>
    <van-field
      readonly
      clickable
      label="时辰"
      v-model="time"
      placeholder="选择时辰"
      @click="showTime = true"
    />
    <van-popup v-model:show="showTime" round position="bottom">
      <van-picker
        show-toolbar
        :columns="timeList"
        @cancel="showTime = false"
        @confirm="confirmTime"
      />
    </van-popup>
    <div style="margin: 16px;">
    <!-- <van-button round block type="info" native-type="submit">提交</van-button> -->
  </div>
    <van-button round block type="default" @click="submit">提交</van-button>
    <div class="result">称骨重：{{total}}</div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from 'vue'
import Constant from "./index";
export default {
  setup() {
    const state = reactive({
      year: "",
      monthDay: "",
      time: "",
      showYear: false,
      showMonth: false,
      showTime: false,
      yearSkyLand: [],
      monthDayList: [
        { values: Object.keys(Constant.detailMonth) },
        { values: Object.keys(Constant.detailDay) },
      ],
      timeList: [],
      allWeight: {
        year: 0,
        month: 0,
        day: 0,
        time: 0,
      },
      total: 0,
    });
    const confirmYear = (value) => {
      const val = value.split(" ");
      const data = Constant.detailYears[val[1]];
      state.year = `${val[0]} ${val[1]}年 属${data.zodiac} ${data.weight}`;
      state.allWeight.year = data.number;
      state.showYear = false;
    };
    const confirmMonthDay = (values) => {
      state.monthDay = values[0] + values[1];
      state.allWeight.month = Constant.detailMonth[values[0]].number;
      state.allWeight.day = Constant.detailDay[values[1]].number;
      state.showMonth = false;
    };
    const confirmTime = (value) => {
      state.time = value;
      state.allWeight.time = Constant.detailTime[value.split("(")[0]].number;
      state.showTime = false;
    };
    const submit = () => {
      state.total = 0;
      for (let k in state.allWeight) {
        state.total += parseFloat(state.allWeight[k]);
      }
      state.total = state.total.toFixed(2);
    };
    const getYears = () => {
      let year = [];
      for (let i = new Date().getFullYear(); i >= 1950; i--) {
        year.push(i);
      }
      year.forEach((item, index) => {
        let str = `${item} ${Constant.skyText[
          Constant.skyNumber.indexOf(parseInt(item.toString().substr(-1)))
          ]
          }`;
        str += `${Constant.landText[Constant.landNumber.indexOf(item % 12)]}`;
        state.yearSkyLand.push(str);
      });
    };
    const getTimes = () => {
      for (let k in Constant.detailTime) {
        state.timeList.push(`${k}(${Constant.detailTime[k].desc})`);
      }
    };
    getYears();
    getTimes();
    return {
      ...toRefs(state),
      confirmYear,
      confirmMonthDay,
      confirmTime,
      submit,
    };
  },
};

</script>

<style lang="scss" scoped>
.result {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
