
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
    // Engine RPM
    RPM: '01 0C',
    // Calculated engine load
    LOAD: '01 04',
    // Engine coolant temperature
    ECT: '01 05',
    // Vehicle speed
    SPEED: '01 0D',
    // Run time since engine start
    RUN_TIME: '01 1F',
    // Fuel Tank Level Input
    FUEL_LEVEL: '01 2F',
    // Monitor status this drive cycle
    MDC: '01 41',
    // Control module voltage
    CMV: '01 42',
    // Accelerator pedal position D
    APPD: '01 49',
    // Accelerator pedal position E
    APPE: '01 4A',
    // Accelerator pedal position F
    APPF: '01 4B',
};

export default {
    MODE01
};