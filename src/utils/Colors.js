export default {
    SMOKY_BLACK: '#0F110C',
    COSMIC_LATTE: '#FFFCE8',
    TIMBERWOLF: '#DAD6D6',
    CELESTIAL_BLUE: '#3E92CC',
    CRIMSON: '#DB162F',
    TRACTOR_RED: '#F71735'
};

export function hexToRgb(hex) {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r},${g},${b},1)`;
}