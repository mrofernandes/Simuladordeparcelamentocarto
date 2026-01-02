import svgPaths from "./svg-q0gmjldgd6";
import { imgRectangle5 } from "./svg-ss4hr";

function BlendMask() {
  return (
    <div className="absolute contents inset-0" data-name="Blend Mask">
      <div className="absolute bg-white inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%] mask-size-[100%_100%]" style={{ maskImage: `url('${imgRectangle5}')` }} />
    </div>
  );
}

function Wifi() {
  return (
    <div className="absolute inset-[48.08%_14.72%_19.23%_80.56%]" data-name="Wifi">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Wifi">
          <g id="Path"></g>
          <g id="Rectangle"></g>
          <g id="Path_2"></g>
          <path d={svgPaths.p34567080} fill="var(--fill-0, #1A1A1A)" id="Path_3" />
        </g>
      </svg>
    </div>
  );
}

function Signal() {
  return (
    <div className="absolute inset-[48.08%_10.28%_19.23%_85%]" data-name="Signal">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Signal">
          <g id="Path"></g>
          <path d={svgPaths.p112c6500} fill="var(--fill-0, #1A1A1A)" id="Path_2" />
        </g>
      </svg>
    </div>
  );
}

function Battery() {
  return (
    <div className="absolute h-[15px] left-[328px] top-[26px] w-[8px]" data-name="Battery">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 15">
        <g id="Battery">
          <path d={svgPaths.p2dfd100} fill="var(--fill-0, #1A1A1A)" id="Base" />
          <path d={svgPaths.p2657cc00} fill="var(--fill-0, #1A1A1A)" id="Charge" />
        </g>
      </svg>
    </div>
  );
}

function RightIcons() {
  return (
    <div className="absolute contents left-[290px] top-[25px]" data-name="right icons">
      <Wifi />
      <Signal />
      <Battery />
    </div>
  );
}

function OsStatusBarV() {
  return (
    <div className="h-[52px] overflow-clip relative shrink-0 w-[360px]" data-name="OS Status Bar v0.0.1">
      <div className="absolute inset-[61.1%_85.86%_19.23%_6.67%]" data-name="Time">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(26, 26, 26, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 11">
            <g id="Time">
              <path d={svgPaths.p117e9600} fill="var(--fill-0, #1A1A1A)" />
              <path d={svgPaths.p22691a00} fill="var(--fill-0, #1A1A1A)" />
              <path d={svgPaths.p3322c400} fill="var(--fill-0, #1A1A1A)" />
              <path d={svgPaths.p194f8400} fill="var(--fill-0, #1A1A1A)" />
            </g>
          </svg>
        </div>
      </div>
      <RightIcons />
    </div>
  );
}

function IcArrowLeft() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ic-arrow_left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ic-arrow_left">
          <path d={svgPaths.pbe08c80} fill="var(--fill-0, #1A1A1A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function LeadingIconBg() {
  return (
    <div className="absolute bg-neutral-100 box-border content-stretch flex items-center left-0 p-[8px] rounded-[12px] top-0" data-name="Leading Icon Bg">
      <IcArrowLeft />
    </div>
  );
}

function LeadingIconSlot() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Leading Icon Slot">
      <LeadingIconBg />
    </div>
  );
}

function TrailingIconSlot() {
  return <div className="shrink-0 size-[40px]" data-name="Trailing Icon Slot" />;
}

function Icons() {
  return (
    <div className="box-border content-stretch flex gap-[16px] items-center px-[24px] py-[16px] relative shrink-0 w-[360px]" data-name="Icons">
      <LeadingIconSlot />
      <div className="basis-0 flex flex-col font-['Montserrat:Bold',sans-serif] font-bold grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#1a1a1a] text-[17px] text-center">
        <p className="leading-[normal]"> </p>
      </div>
      <TrailingIconSlot />
    </div>
  );
}

function NavbarV() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0" data-name="Navbar v.0.2.0">
      <OsStatusBarV />
      <Icons />
      <BlendMask />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-1/2 top-[124px] translate-x-[-50%] w-[312px]">
      <div className="basis-0 bg-[#d80073] grow h-[4px] min-h-px min-w-px rounded-[8px] shrink-0" />
      <div className="basis-0 bg-[#dedede] grow h-[4px] min-h-px min-w-px rounded-[8px] shrink-0" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col font-semibold gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['Montserrat:SemiBold',sans-serif] leading-[32px] relative shrink-0 text-[#1a1a1a] text-[24px] w-full">Qual valor que você deseja receber?</p>
      <p className="font-['Open_Sans:SemiBold',sans-serif] leading-[24px] relative shrink-0 text-[#666666] text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span>{`Disponível para você `}</span>
        <span className="text-[#1a1a1a]">R$ 15.000,00</span>
      </p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex font-['Montserrat:SemiBold',sans-serif] font-semibold gap-[8px] items-center leading-[0] px-[16px] py-[12px] relative text-[#1a1a1a] text-[24px] w-full">
          <div className="flex flex-col justify-center relative shrink-0 text-nowrap">
            <p className="leading-[32px] whitespace-pre">R$</p>
          </div>
          <div className="basis-0 flex flex-col grow justify-center min-h-px min-w-px relative shrink-0">
            <p className="leading-[32px]">15.000,00</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d80073] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function SupportingText() {
  return <div className="content-stretch flex gap-[4px] items-center shrink-0 w-full" data-name=".supporting-text" />;
}

function InputValueV() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="InputValue v0.0.1">
      <Input />
      <SupportingText />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[312px]">
      <InputValueV />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[24px] items-start left-0 px-[24px] py-0 top-[144px] w-[360px]">
      <Frame3 />
      <Frame1 />
    </div>
  );
}

function DividerHorizontalType() {
  return (
    <div className="h-px relative shrink-0 w-[360px]" data-name="Divider/Horizontal/Type4">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 1">
        <g id="Divider/Horizontal/Type4">
          <line id="Divider" stroke="var(--stroke-0, black)" strokeOpacity="0.08" x1="4.371e-08" x2="360" y1="0.500016" y2="1.50002" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white">
        <p className="leading-[16px] whitespace-pre">Continuar</p>
      </div>
    </div>
  );
}

function ButtonV() {
  return (
    <div className="bg-[#d80073] box-border content-stretch flex flex-col items-center justify-center max-w-[312px] min-w-[180px] overflow-clip px-[32px] py-[12px] relative rounded-[16px] shrink-0" data-name="Button v.2.0.1">
      <Container />
      <div className="h-0 relative shrink-0 w-[248px]" data-name="↔ Full Width">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="â Full Width"></g>
        </svg>
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name=".Buttons">
      <ButtonV />
    </div>
  );
}

function Content() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-[24px] pt-[16px] px-[24px] relative shrink-0" data-name="Content">
      <Buttons />
    </div>
  );
}

function BottomContainerMobileV() {
  return (
    <div className="absolute bg-white bottom-[217px] content-stretch flex flex-col items-start left-0 w-[360px]" data-name="BottomContainer Mobile v.2.0.0">
      <DividerHorizontalType />
      <Content />
    </div>
  );
}

function ComponentKey() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col grow h-[46px] items-start min-h-px min-w-px not-italic overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d] shrink-0 text-black text-center" data-name="Component / Key">
      <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">1</p>
      <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full"> </p>
    </div>
  );
}

function ComponentKey1() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col grow h-[46px] items-start min-h-px min-w-px not-italic overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d] shrink-0 text-black text-center" data-name="Component / Key">
      <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">2</p>
      <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">ABC</p>
    </div>
  );
}

function ComponentKey2() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col grow h-[46px] items-start min-h-px min-w-px not-italic overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d] shrink-0 text-black text-center" data-name="Component / Key">
      <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">3</p>
      <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">DEF</p>
    </div>
  );
}

function RowNumbers() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full" data-name="row / numbers">
      <ComponentKey />
      <ComponentKey1 />
      <ComponentKey2 />
    </div>
  );
}

function ComponentKey3() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col grow h-[46px] items-start min-h-px min-w-px not-italic overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d] shrink-0 text-black text-center" data-name="Component / Key">
      <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">4</p>
      <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">GHI</p>
    </div>
  );
}

function ComponentKey4() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col grow h-[46px] items-start min-h-px min-w-px not-italic overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d] shrink-0 text-black text-center" data-name="Component / Key">
      <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">5</p>
      <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">JKL</p>
    </div>
  );
}

function ComponentKey5() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col grow h-[46px] items-start min-h-px min-w-px not-italic overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d] shrink-0 text-black text-center" data-name="Component / Key">
      <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">6</p>
      <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">MNO</p>
    </div>
  );
}

function RowNumbers1() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full" data-name="row / numbers">
      <ComponentKey3 />
      <ComponentKey4 />
      <ComponentKey5 />
    </div>
  );
}

function ComponentKey6() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col grow h-[46px] items-start min-h-px min-w-px not-italic overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d] shrink-0 text-black text-center" data-name="Component / Key">
      <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">7</p>
      <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">PQRS</p>
    </div>
  );
}

function ComponentKey7() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col grow h-[46px] items-start min-h-px min-w-px not-italic overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d] shrink-0 text-black text-center" data-name="Component / Key">
      <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">8</p>
      <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">TUV</p>
    </div>
  );
}

function ComponentKey8() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col grow h-[46px] items-start min-h-px min-w-px not-italic overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d] shrink-0 text-black text-center" data-name="Component / Key">
      <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">9</p>
      <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">WXYZ</p>
    </div>
  );
}

function RowNumbers2() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full" data-name="row / numbers">
      <ComponentKey6 />
      <ComponentKey7 />
      <ComponentKey8 />
    </div>
  );
}

function ComponentKey9() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[4.6px] self-stretch shrink-0" data-name="Component / Key">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex items-center justify-center p-[7px] relative size-full">
          <p className="basis-0 font-['SF_Pro_Display:Regular',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[#50555c] text-[22px] text-center"> </p>
        </div>
      </div>
    </div>
  );
}

function ComponentKey10() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col grow h-[46px] items-start min-h-px min-w-px not-italic overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d] shrink-0 text-black text-center" data-name="Component / Key">
      <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">0</p>
      <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full"> </p>
    </div>
  );
}

function ComponentKey11() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[4.6px] self-stretch shrink-0" data-name="Component / Key">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex items-center justify-center p-[7px] relative size-full">
          <p className="basis-0 font-['SF_Pro_Display:Regular','Noto_Sans:Regular',sans-serif] grow leading-[28px] min-h-px min-w-px relative shrink-0 text-[#50555c] text-[22px] text-center" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
            􀆛
          </p>
        </div>
      </div>
    </div>
  );
}

function RowNumbers3() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full" data-name="row / numbers">
      <ComponentKey9 />
      <ComponentKey10 />
      <ComponentKey11 />
    </div>
  );
}

function KeysLayoutNumericEnglishDefault() {
  return (
    <div className="absolute backdrop-blur-[10px] backdrop-filter bg-[#ececec] bottom-0 box-border content-stretch flex flex-col gap-[7px] items-start left-0 p-[6px] w-[360px]" data-name=".Keys Layout / Numeric / English / Default">
      <RowNumbers />
      <RowNumbers1 />
      <RowNumbers2 />
      <RowNumbers3 />
    </div>
  );
}

export default function ValorDoEmprestimo() {
  return (
    <div className="bg-white relative size-full" data-name="[Valor do empréstimo]">
      <NavbarV />
      <Frame />
      <Frame2 />
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center left-[203px] top-[272px] w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "36", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[36px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 1">
                <line id="Line 7" stroke="var(--stroke-0, #D80073)" x2="36" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <BottomContainerMobileV />
      <KeysLayoutNumericEnglishDefault />
    </div>
  );
}