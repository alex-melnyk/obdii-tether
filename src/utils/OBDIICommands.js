
export const MODE01 = {
    // PIDs supported [1-20]
    PIDS1: '01 00',
    // PIDs supported  [21 - 40]
    PIDS2: '01 20',
    // PIDs supported  [41 - 60]
    PIDS3: '01 40',
    // PIDs supported  [61 - 80]
    PIDS4: '01 60',
    // PIDs supported  [81 - A0]
    PIDS5: '01 80',
    // Engine RPM [((A*256)+B)/4]
    RPM: '01 0C',
    // Calculated engine load value [A*100/255]
    LOAD: '01 04',
    // Engine coolant temperature [A-40]
    ECT: '01 05',
    // Vehicle speed
    SPEED: '01 0D',
    // Fuel system status
    FUEL_SYSTEM_STATUS: '01 03',
    // Throttle position
    TP: '01 11',
    // Intake air temperature
    AIT: '01 0F',
};

const MODE21 = {
    // 61 01 [0,1,2,4,5,6,7,A] = [1,2,3,D,N,R,P,E]
    AGM: '21 01',
};

export default {
    MODE01,
    MODE21
};

