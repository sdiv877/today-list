export const BG_COLOURS = [
  "#ffffff",
  "#d27676",
  "#e49576",
  "#f2bdca",
  "#f4dc76",
  "#76bc77",
  "#76abb1",
  "#7fafe5",
  "#769cde",
  "#9f76ec"
];

const BUTTON_COLOURS = [
  "#1976d2",
  "#d2a476",
  "#3cafda",
  "#eb8561",
  "#ec7940",
  "#7776bc",
  "#b17c76",
  "#1976d2",
  "#deb876",
  "#e27c3f"
];

export function getButtonColour(bgColour: string): string {
  return BUTTON_COLOURS[BG_COLOURS.indexOf(bgColour)];
}
