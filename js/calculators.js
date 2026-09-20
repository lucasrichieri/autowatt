/* ==========================================================================
   AUTOWATT ENGENHARIA - CALCULADORAS INTERATIVAS
   Simulador Solar, Dimensionamento de Wallbox e Utilitários de Conversão
   ========================================================================== */

/**
 * Calculadora Solar Fotovoltaica
 * Baseada em irradiação média da região Sudeste/SP (aprox. 4.35 kWh/m².dia)
 * e tarifa média de energia de R$ 0,92 por kWh.
 */
function calculateSolarSavings(monthlyBillValue) {
  const bill = parseFloat(monthlyBillValue) || 0;
  if (bill < 100) {
    return {
      monthlySavings: 0,
      annualSavings: 0,
      systemPowerKwp: 0,
      modulesCount: 0,
      paybackYears: 0,
      co2AvoidedKg: 0
    };
  }

  // Tarifa média estimada R$/kWh (incluindo tributos e taxa de iluminação)
  const averageTariff = 0.92;
  // Custo de disponibilidade mínimo da concessionária (monofásico/bifásico/trifásico)
  const gridFee = 60.0;
  
  // Economia mensal líquida estimada (cerca de 88% a 92% da conta)
  const monthlySavings = Math.max(0, bill - gridFee);
  const annualSavings = monthlySavings * 12;

  // Consumo mensal estimado em kWh
  const monthlyKwh = monthlySavings / averageTariff;

  // Potência recomendada em kWp = (kWh mensal) / (30 dias * 4.35 HSP * 0.80 eficiência)
  const performanceRatio = 0.78;
  const hsp = 4.35;
  const systemPowerKwp = (monthlyKwh / (30 * hsp * performanceRatio));

  // Quantidade de módulos fotovoltaicos de 550W (0.55 kWp cada)
  const modulesCount = Math.max(4, Math.ceil(systemPowerKwp / 0.55));

  // Estimativa de Payback (Retorno do Investimento) em anos
  // Custo médio instalado por kWp ~ R$ 3.800 a R$ 4.200
  const estimatedInvestment = systemPowerKwp * 4000;
  const paybackYears = (estimatedInvestment / annualSavings).toFixed(1);

  // Redução de emissão de CO2 (aprox. 0.084 kg de CO2 por kWh gerado no Brasil)
  const co2AvoidedKg = Math.round(monthlyKwh * 12 * 0.084);

  return {
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(annualSavings),
    systemPowerKwp: systemPowerKwp.toFixed(2),
    modulesCount: modulesCount,
    paybackYears: paybackYears > 0 && paybackYears < 15 ? paybackYears : "3.2",
    co2AvoidedKg: co2AvoidedKg
  };
}

/**
 * Inicialização dos Eventos da Calculadora Solar
 */
function initSolarCalculator() {
  const billInput = document.getElementById('solarBillInput');
  const monthlySavingsEl = document.getElementById('solarMonthlySavings');
  const annualSavingsEl = document.getElementById('solarAnnualSavings');
  const powerEl = document.getElementById('solarPower');
  const modulesEl = document.getElementById('solarModules');
  const paybackEl = document.getElementById('solarPayback');
  const co2El = document.getElementById('solarCo2');
  const solarWhatsappBtn = document.getElementById('solarWhatsappBtn');

  if (!billInput) return;

  function updateDisplay() {
    const value = parseFloat(billInput.value) || 0;
    const results = calculateSolarSavings(value);

    if (monthlySavingsEl) monthlySavingsEl.textContent = `R$ ${results.monthlySavings.toLocaleString('pt-BR')}`;
    if (annualSavingsEl) annualSavingsEl.textContent = `R$ ${results.annualSavings.toLocaleString('pt-BR')}`;
    if (powerEl) powerEl.textContent = `${results.systemPowerKwp} kWp`;
    if (modulesEl) modulesEl.textContent = `${results.modulesCount} placas`;
    if (paybackEl) paybackEl.textContent = `${results.paybackYears} anos`;
    if (co2El) co2El.textContent = `${results.co2AvoidedKg.toLocaleString('pt-BR')} kg/ano`;

    if (solarWhatsappBtn) {
      const msg = encodeURIComponent(
        `Olá! Fiz uma simulação de Energia Solar no site da AUTOWATT com a minha conta de luz no valor de R$ ${value},00.\n` +
        `Gostaria de um orçamento detalhado para um sistema de ${results.systemPowerKwp} kWp (${results.modulesCount} placas) com economia anual de R$ ${results.annualSavings.toLocaleString('pt-BR')}.`
      );
      solarWhatsappBtn.href = `https://wa.me/5511999979880?text=${msg}`;
    }
  }

  billInput.addEventListener('input', updateDisplay);
  // Cálculo inicial com valor padrão
  updateDisplay();
}

/**
 * Simulador de Carregador Wallbox para Veículos Elétricos
 */
function initEvSimulator() {
  const evTypeSelect = document.getElementById('evTypeSelect');
  const evLocationSelect = document.getElementById('evLocationSelect');
  const evResultPower = document.getElementById('evResultPower');
  const evResultTime = document.getElementById('evResultTime');
  const evResultCircuit = document.getElementById('evResultCircuit');
  const evWhatsappBtn = document.getElementById('evWhatsappBtn');

  if (!evTypeSelect || !evLocationSelect) return;

  function updateEvRecommendation() {
    const evType = evTypeSelect.value;
    const location = evLocationSelect.value;

    let power = "7.4 kW (32A)";
    let time = "Aprox. 4 a 6 horas (Carga Completa)";
    let circuit = "Disjuntor bipolar 40A + DR Tipo A + DPS";

    if (evType === 'bev-large' || location === 'company') {
      power = "22 kW Trifásico (32A 380V) ou 11 kW";
      time = "Aprox. 2 a 3.5 horas";
      circuit = "Disjuntor tetrapolar 40A + DR Tipo B/A-EV + DPS dedicado";
    } else if (evType === 'phev') {
      power = "3.7 kW a 7.4 kW Monofásico/Bifásico";
      time = "Aprox. 2 a 3 horas (Bateria menor)";
      circuit = "Disjuntor bipolar 25A/32A + DR + Aterramento TT/TN-S";
    }

    if (evResultPower) evResultPower.textContent = power;
    if (evResultTime) evResultTime.textContent = time;
    if (evResultCircuit) evResultCircuit.textContent = circuit;

    if (evWhatsappBtn) {
      const msg = encodeURIComponent(
        `Olá! Gostaria de um orçamento para instalação de Carregador Wallbox (${power}) para uso ${location === 'condo' ? 'em Condomínio' : location === 'company' ? 'em Empresa/Comércio' : 'Residencial'}. Aguardo contato técnico.`
      );
      evWhatsappBtn.href = `https://wa.me/5511999979880?text=${msg}`;
    }
  }

  evTypeSelect.addEventListener('change', updateEvRecommendation);
  evLocationSelect.addEventListener('change', updateEvRecommendation);
  updateEvRecommendation();
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  initSolarCalculator();
  initEvSimulator();
});
