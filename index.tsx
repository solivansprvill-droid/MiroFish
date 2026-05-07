import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { trpc } from "@/lib/trpc";
import { AGENTS } from "@/server/agents";

export default function HomeScreen() {
  const [symbol, setSymbol] = useState("BTC");
  const generateMutation = trpc.mirofish.generateReport.useMutation();
  const [report, setReport] = useState<any>(null);

  const handleGenerate = async () => {
    if (!symbol) return;
    try {
      const result = await generateMutation.mutateAsync({ symbol });
      setReport(result);
    } catch (error) {
      console.error("Failed to generate report:", error);
    }
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">MiroFish</Text>
            <Text className="text-sm text-muted text-center">
              多 Agent 博弈 · 实时数据驱动 · 深度投资报告
            </Text>
          </View>

          {/* Input Section */}
          <View className="bg-surface rounded-2xl p-4 border border-border gap-4">
            <Text className="text-base font-semibold text-foreground">输入资产代码 (如 BTC, ETH, SOL)</Text>
            <TextInput
              className="bg-background border border-border rounded-xl px-4 py-3 text-foreground"
              value={symbol}
              onChangeText={setSymbol}
              placeholder="例如: BTC"
              placeholderTextColor="#999"
            />
            <TouchableOpacity 
              className={`bg-primary py-4 rounded-xl items-center ${generateMutation.isLoading ? 'opacity-50' : ''}`}
              onPress={handleGenerate}
              disabled={generateMutation.isLoading}
            >
              {generateMutation.isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-background font-bold text-lg">生成博弈报告</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Agents Preview */}
          <View className="flex-row justify-between px-2">
            {Object.values(AGENTS).map((agent) => (
              <View key={agent.id} className="items-center gap-1">
                <Text className="text-2xl">{agent.avatar}</Text>
                <Text className="text-[10px] text-muted">{agent.name}</Text>
              </View>
            ))}
          </View>

          {/* Report Display */}
          {report && (
            <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
              <Text className="text-xl font-bold text-foreground">{report.symbol} 深度分析报告</Text>
              <Text className="text-sm text-foreground leading-relaxed">
                {report.content}
              </Text>
              
              <View className="border-t border-border pt-4 mt-2">
                <Text className="text-base font-semibold mb-3">专家观点摘要：</Text>
                {report.opinions.map((op: any) => (
                  <View key={op.agentId} className="mb-3 bg-background p-3 rounded-lg">
                    <Text className="font-bold text-primary">{op.name}:</Text>
                    <Text className="text-xs text-muted mt-1">{op.opinion.substring(0, 100)}...</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
