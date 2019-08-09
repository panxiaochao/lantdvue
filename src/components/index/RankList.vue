<template>
<div class="rank">
  <h3 class="title">{{ title }}</h3>
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
  }
}
</script>

<style lang="scss" scoped>
.rank {
    padding: 15px;

    .list {
        margin: 25px 0 0;
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
