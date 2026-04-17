<script setup>
import { ref, onMounted } from "vue"
import { MoreFilled } from "@element-plus/icons-vue"
import { apiRoomsList, apiRoomPatientsList } from "@/apis/bloodGlucoseManagement/bedLIst"

defineOptions({
  name: "BedList",
})

const department = ref("呼吸道科")
const rooms = ref([])
const activeRoomId = ref(null)

const patients = ref([])

const getRooms = async () => {
  try {
    const res = await apiRoomsList()
    if (res.success) {
      rooms.value = res.data || []
      if (rooms.value.length > 0) {
        activeRoomId.value = rooms.value[0].id
        getPatients(activeRoomId.value)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

const getPatients = async (roomId) => {
  try {
    const res = await apiRoomPatientsList(roomId)
    if (res.success) {
      patients.value = res.data || []
    }
  } catch (error) {
    console.error(error)
  }
}

function selectRoom(room) {
  if (activeRoomId.value !== room.id) {
    activeRoomId.value = room.id
    getPatients(room.id)
  }
}

onMounted(() => {
  getRooms()
})
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
                <span class="bed-no">{{ p.bed }}{{ String(p.bed || '').includes('床') ? '' : '床' }}</span>
              </div>
              <div class="time">{{ p.time || '-' }}</div>
              <div class="name-day">
                <span class="name">{{ p.name || '-' }}</span>
              </div>
              <div class="day">{{ p.day || '-' }}</div>
            </div>
            <div class="card-middle">
              <div class="info-row">
                <span class="label">患者病情</span>
                <span class="value">{{ p.condition || '-' }}</span>
              </div>
              <div class="info-row">
                <span class="label">患者状态</span>
                <span class="value">{{ p.status || '-' }}</span>
              </div>
              <div class="info-row">
                <span class="label">治疗药品</span>
                <span class="value">{{ p.medication || '-' }}</span>
              </div>
              <div class="info-row">
                <span class="label">住院天数</span>
                <span class="value">{{ p.hospitalDays || '-' }}</span>
              </div>
            </div>
            <div class="card-right">
              <el-icon class="more-icon"><MoreFilled /></el-icon>
            </div>
          </template>
          <template v-else>
            <span class="empty-bed">{{ p.bed }}{{ String(p.bed || '').includes('床') ? '' : '床' }}</span>
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
  background-color: #ffffff;
}

.sidebar {
  width: 320px;
  background: transparent;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: var(--el-bg-color-overlay);
    
    .title {
      font-size: 16px;
      font-weight: bold;
      color: var(--el-text-color-primary);
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
      background: var(--el-bg-color-overlay);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 12px;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.3s;

      &.active {
        background: var(--el-color-primary-light-9);
      }

      .room-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        
        .room-name {
          font-weight: bold;
          color: var(--el-text-color-primary);
        }
        .room-nurse {
          color: var(--el-color-primary);
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
            background: var(--el-color-primary);
          }
        }
      }
    }
  }
}

.main-content {
  flex: 1;
  background: transparent;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .main-header {
    padding: 20px;
    background: var(--el-bg-color-overlay);
    
    .title {
      font-size: 16px;
      font-weight: bold;
      color: var(--el-text-color-primary);
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
      background: var(--el-color-primary-light-9);
      border: 1px solid var(--el-color-primary);
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 16px;
      display: flex;

      &.empty {
        background: var(--el-bg-color-overlay);
        justify-content: space-between;
        align-items: center;

        .empty-bed {
          font-weight: bold;
          color: var(--el-text-color-primary);
          font-size: 16px;
        }

        .add-btn {
          background-color: var(--el-color-primary);
          border-color: var(--el-color-primary);
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
          color: var(--el-text-color-primary);
        }
        .time {
          color: var(--el-color-primary);
          font-size: 13px;
        }
        .name {
          color: var(--el-text-color-regular);
          font-size: 14px;
        }
        .day {
          color: var(--el-text-color-regular);
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
            color: var(--el-text-color-primary);
            font-weight: 500;
          }
          .value {
            color: var(--el-text-color-regular);
          }
        }
      }

      .card-right {
        width: 60px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;

        .more-icon {
          color: var(--el-color-primary);
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
