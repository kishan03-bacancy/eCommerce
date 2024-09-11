const { readdirSync, writeFileSync } = require('fs');

const svgIconData: any[] = [];

readdirSync('src/assets/icons')
  .filter((item: any) => item.includes('.svg'))
  .forEach((fileName: string) => {
    svgIconData.push({
      name: fileName.replaceAll('-', '_').replace('.svg', ''),
      fileName,
    });
  });

let stringData = JSON.stringify(svgIconData);

let data = `import { SVGIcon } from '../models/svg-icon.model';\nexport const svgIcons: SVGIcon[] = ${stringData};\n`;

writeFileSync('src/app/shared/constants/svg-icons.data.ts', data);
