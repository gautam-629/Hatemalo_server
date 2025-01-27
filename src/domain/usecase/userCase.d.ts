export interface IUseCase<Input = unknown, Output = unknown> {
    execute(data: Input): Promise<Output>;
  }
  