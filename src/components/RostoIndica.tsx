import { arquivoPublico } from '@/lib/format';

/** Arte original da INDICA, preservada e aplicada ao tema escuro por CSS. */
export function RostoIndica({ expressao = '01', tamanho = 108, className = '' }: {
  expressao?: '01' | '02' | '03'; tamanho?: number; className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={`indica-rosto ${className}`} src={arquivoPublico(`/marca/rostos/rosto-${expressao}.png`)}
      width={tamanho} height={tamanho} alt="" aria-hidden="true" />
  );
}
