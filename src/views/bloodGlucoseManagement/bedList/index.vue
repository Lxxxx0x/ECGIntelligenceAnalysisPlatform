<script setup>
import { ref } from "vue"
import { MoreFilled } from "@element-plus/icons-vue"

defineOptions({
  name: "BedList",
})

const department = ref("呼吸道科")
const rooms = ref(
  Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `普通病房 40${i + 1}`,
    nurse: "护士-刘爽",
    totalBeds: 5,
    occupiedBeds: Math.floor(Math.random() * 5) + 1,
  }))
)
const activeRoomId = ref(1)

const patients = ref([
  {
    bed: "1号床",
    time: "2023-09-14-10:30",
    name: "曹操",
    day: "第1天",
    condition: "慢性非萎缩性胃炎并胃窦轻度糜烂",
    status: "手术恢复",
    medication: "阿莫西林",
    hospitalDays: "5天",
    isEmpty: false,
  },
  {
    bed: "2号床",
    time: "2023-09-14-10:30",
    name: "曹丕",
    day: "第1天",
    condition: "慢性非萎缩性胃炎并胃窦轻度糜烂",
    status: "手术恢复",
    medication: "阿莫西林",
    hospitalDays: "5天",
    isEmpty: false,
  },
  {
    bed: "3号床",
    time: "2023-09-14-10:30",
    name: "司马懿",
    day: "第1天",
    condition: "慢性非萎缩性胃炎并胃窦轻度糜烂",
    status: "手术恢复",
    medication: "阿莫西林",
    hospitalDays: "5天",
    isEmpty: false,
  },
  {
    bed: "4号床",
    isEmpty: true,
  },
  {
    bed: "5号床",
    isEmpty: true,
  },
])

function selectRoom(room) {
  activeRoomId.value = room.id
}
</script>

<template>
  <div class="page-container">
    <!-- 左侧 病房信息 -->
    <div class="sidebar">
      <div class="sidebar-header">
        <span class="title">病房信息</span>
        <el-select v-model="department" size="small" style="width: 100px;">
          <el-option label="呼吸道课" value="呼吸道课" />
          <el-option label="消化内科" value="消化内科" />
        </el-select>
      </div>
      <div class="room-list">
        <div
          v-for="room in rooms"
          :key="room.id"
          class="room-item"
          :class="{ active: activeRoomId === room.id }"
          @click="selectRoom(room)"
        >
          <div class="room-info">
            <span class="room-name">{{ room.name }}</span>
            <span class="room-nurse">{{ room.nurse }}</span>
          </div>
          <div class="bed-squares">
            <div
              v-for="i in room.totalBeds"
              :key="i"
              class="square"
              :class="{ occupied: i <= room.occupiedBeds }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧 患者信息 -->
    <div class="main-content">
      <div class="main-header">
        <span class="title">患者信息</span>
      </div>
      <div class="patient-list">
        <div
          v-for="(p, index) in patients"
          :key="index"
          class="patient-card"
          :class="{ empty: p.isEmpty }"
        >
          <template v-if="!p.isEmpty">
            <div class="card-left">
              <div class="top-row">
                <span class="bed-no">{{ p.bed }}</span>
              </div>
              <div class="time">{{ p.time }}</div>
              <div class="name-day">
                <span class="name">{{ p.name }}</span>
              </div>
              <div class="day">{{ p.day }}</div>
            </div>
            <div class="card-middle">
              <div class="info-row">
                <span class="label">患者病情</span>
                <span class="value">{{ p.condition }}</span>
              </div>
              <div class="info-row">
                <span class="label">患者状态</span>
                <span class="value">{{ p.status }}</span>
              </div>
              <div class="info-row">
                <span class="label">治疗药品</span>
                <span class="value">{{ p.medication }}</span>
              </div>
              <div class="info-row">
                <span class="label">住院天数</span>
                <span class="value">{{ p.hospitalDays }}</span>
              </div>
            </div>
            <div class="card-right">
              <el-icon class="more-icon"><MoreFilled /></el-icon>
            </div>
          </template>
          <template v-else>
            <span class="empty-bed">{{ p.bed }}</span>
            <el-button type="primary" round class="add-btn">添加患者</el-button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  display: flex;
  height: 100%;
  gap: 20px;
  background-color: transparent;
}

.sidebar {
  width: 320px;
  background: #f7fbfa;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #fff;
    
    .title {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
  }

  .room-list {
    flex: 1;
    overflow-y: auto;
    padding: 10px 20px;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 3px;
    }

    .room-item {
      background: #fff;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 12px;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.3s;

      &.active {
        background: #f2f9f9;
      }
      
      .room-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        
        .room-name {
          font-weight: bold;
          color: #333;
        }
        .room-nurse {
          color: #1DABA6;
          font-size: 14px;
        }
      }

      .bed-squares {
        display: flex;
        gap: 8px;

        .square {
          width: 30px;
          height: 24px;
          background: #e6e6e6;
          border-radius: 4px;

          &.occupied {
            background: #1DABA6;
          }
        }
      }
    }
  }
}

.main-content {
  flex: 1;
  background: #f7fbfa;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .main-header {
    padding: 20px;
    background: #fff;
    
    .title {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
  }

  .patient-list {
    flex: 1;
    overflow-y: auto;
    padding: 20px;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 3px;
    }

    .patient-card {
      background: #f2f9f9;
      border: 1px solid #1DABA6;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 16px;
      display: flex;

      &.empty {
        background: #fff;
        justify-content: space-between;
        align-items: center;

        .empty-bed {
          font-weight: bold;
          color: #333;
          font-size: 16px;
        }

        .add-btn {
          background-color: #1DABA6;
          border-color: #1DABA6;
        }
      }

      .card-left {
        width: 150px;
        display: flex;
        flex-direction: column;
        gap: 12px;

        .bed-no {
          font-weight: bold;
          font-size: 16px;
          color: #333;
        }
        .time {
          color: #1DABA6;
          font-size: 13px;
        }
        .name {
          color: #666;
          font-size: 14px;
        }
        .day {
          color: #666;
          font-size: 14px;
        }
      }

      .card-middle {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-left: 20px;
        gap: 16px;

        .info-row {
          display: flex;
          font-size: 14px;
          
          .label {
            width: 80px;
            color: #333;
            font-weight: 500;
          }
          .value {
            color: #666;
          }
        }
      }

      .card-right {
        width: 60px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;

        .more-icon {
          color: #1DABA6;
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
