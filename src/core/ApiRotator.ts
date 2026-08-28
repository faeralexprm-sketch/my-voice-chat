/**
 * Утилита для управления ротацией API ключей и провайдеров.
 * Позволяет автоматически переключаться между моделями при сбоях.
 */

type ApiProvider = 'gemini' | 'openai' | 'anthropic' | 'local_inf';

interface ApiConfig {
  id: string;
  provider: ApiProvider;
  apiKey: string;
  endpoint: string;
  priority: number; // Чем меньше число, тем выше приоритет
  isActive: boolean;
}

interface ApiResponse {
  text: string;
  model: string;
  usage?: any;
}

export class ApiRotator {
  private configs: ApiConfig[] = [];
  private currentIndex: number = 0;

  constructor(configs: ApiConfig[]) {
    // Сортировка: сначала активные, затем по приоритету
    this.configs = configs
      .filter(c => c.isActive)
      .sort((a, b) => a.priority - b.priority);
  }

  /**
   * Основной метод для выполнения запроса с защитой от сбоев
   */
  public async fetchAI(prompt: string): Promise<ApiResponse> {
    let lastError: Error | null = null;
    let attempts = 0;

    // Проходим по кругу не более чем по количеству доступных конфигов
    while (attempts < this.configs.length) {
      const config = this.getCurrentConfig();
      
      try {
        console.log(`[SAR] Попытка через ${config.provider} (ID: ${config.id})...`);
        const result = await this.executeProviderRequest(config, prompt);
        return result;
      } catch (error: any) {
        lastError = error;
        console.error(`[SAR] Ошибка на канале ${config.id}: ${error.message}`);
        
        // Переходим к следующему ключу
        this.rotate();
        attempts++;
      }
    }

    throw new Error(`CRITICAL FAILURE: Все каналы связи недоступны. Последняя ошибка: ${lastError?.message}`);
  }

  private getCurrentConfig(): ApiConfig {
    if (this.configs.length === 0) {
      throw new Error("Конфигурации API не найдены.");
    }
    return this.configs[this.currentIndex];
  }

  private rotate(): void {
    console.warn(`[SYSTEM] Ротация API: Канал ${this.configs[this.currentIndex].id} скомпрометирован или перегружен.`);
    this.currentIndex = (this.currentIndex + 1) % this.configs.length;
  }

  /**
   * Логика запросов к конкретным API
   */
  private async executeProviderRequest(config: ApiConfig, prompt: string): Promise<ApiResponse> {
    // Имитация успешного ответа
    return {
      text: `Ответ от ${config.provider} на запрос: ${prompt}`,
      model: config.id
    };
  }
}

export const apiRotator = new ApiRotator([
  { 
    id: 'gemini-pro-1', 
    provider: 'gemini', 
    apiKey: import.meta.env.VITE_GEMINI_KEY || import.meta.env.VITE_GEMINI_KEY_FALLBACK || 'default', 
    endpoint: 'https://api.gemini.com/v1', 
    priority: 0, 
    isActive: true 
  },
  { 
    id: 'openai-gpt4', 
    provider: 'openai', 
    apiKey: import.meta.env.VITE_OPENAI_KEY || 'default', 
    endpoint: 'https://api.openai.com/v1', 
    priority: 1, 
    isActive: true 
  }
]);
