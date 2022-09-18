/**
 * Only needed for rendering of the colour swatches in the Settings page.
 */
const BG_COLOURS = [
  '#ffffff',
  '#d27676',
  '#e49576',
  '#f2bdca',
  '#f4dc76',
  '#76bc77',
  '#76abb1',
  '#7fafe5',
  '#769cde',
  '#9f76ec'
];

enum BackgroundColour {
  White = '#ffffff',
  Red = '#d27676',
  Orange = '#e49576',
  Pink = '#f2bdca',
  Yellow = '#f4dc76',
  Green = '#76bc77',
  Turquoise = '#76abb1',
  LightBlue = '#7fafe5',
  Blue = '#769cde',
  Purple = '#9f76ec'
}

enum ButtonColour {
  Blue = '#1976d2',
  Sandalwood = '#d2a476',
  Cyan = '#3cafda',
  LightRed = '#eb8561',
  Orange = '#ec7940',
  Purple = '#7776bc',
  Brown = '#b17c76',
  PaleYellow = '#deb876',
  LightOrange = '#e27c3f',
  LightYellow = '#d6c063'
}

class BackgroundColourUtil {
  public static toButtonColour(
    bgColour: BackgroundColour | string
  ): ButtonColour {
    // find the index of bgColour in the BackgrounColour enum, and get the value of ButtonColour at this index
    return Object.values(ButtonColour)[
      Object.values(BackgroundColour).indexOf(this.valueOf(bgColour))
    ];
  }

  public static valueOf(hexColour: string) {
    return hexColour as BackgroundColour;
  }
}

class ButtonColourUtil {
  public static valueOf(hexColour: string) {
    return hexColour as ButtonColour;
  }
}

export {
  BG_COLOURS,
  BackgroundColour,
  ButtonColour,
  BackgroundColourUtil,
  ButtonColourUtil
};
