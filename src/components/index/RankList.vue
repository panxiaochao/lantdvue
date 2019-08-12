<template>
<div class="rank">
  <div class="rank-title">
    <h3 class="title">{{ title }}</h3>
    <div class="sumtext">资金总额：<span>{{sumBalance}}</span> 元</div>
  </div>
  <ul class="list">
    <li :key="index" v-for="(item, index) in list">
      <span :class="index < 3 ? 'active' : null">{{ index + 1 }}</span>
      <span>{{ item.name }}</span>
      <span class="num">{{ item.total }} 元</span>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'RankList',
  // ['title', 'list']
  props: {
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: null
    }
  },
  computed: {
    sumBalance: function() {
      let sum = 0
      console.log(this.list);
      for (var i = 0; i < this.list.length; i++) {
        sum += this.list[i].total
      }
      return sum
    }
  }
}
</script>

<style lang="scss" scoped>
.rank {
    padding: 15px;

    .rank-title {
        display: flex;
        justify-content: space-between;
        .sumtext {
            font-size: 16px;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.85);
            span {
                font-size: 18px;
                color: #F44336;
                font-weight: 600;
            }
        }
    }

    .list {
        margin: 15px 0 0;
        padding: 0;
        list-style: none;

        li {
            margin-top: 16px;
            height: 20px;
            line-height: 20px;
            font-size: 16px;

            span {
                color: rgba(0, 0, 0, .65);

                &:first-child {
                    background-color: #fff;
                    border-radius: 20px;
                    display: inline-block;
                    margin-right: 24px;
                    width: 20px;
                    text-align: center;
                }
                &.active {
                    background-color: #314659;
                    color: #fff;
                }
                &:last-child {
                    float: right;
                }
            }

            .num {
                color: #F44336;
                font-weight: 600;
            }
        }
    }
}
</style>
