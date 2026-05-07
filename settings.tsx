import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { trpc } from "@/lib/trpc";

export default function SettingsScreen() {
  const [apiKey, setApiKey] = useState("");
  const saveMutation = trpc.mirofish.saveApiKey.useMutation();

  const handleSave = async () => {
    if (!apiKey) return;
    try {
      await saveMutation.mutateAsync({ provider: "OpenAI", apiKey });
      Alert.alert("成功", "API Key 已安全保存");
      setApiKey("");
    } catch (error) {
      Alert.alert("错误", "保存失败，请重试");
    }
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView>
        <View className="gap-6">
          <Text className="text-2xl font-bold text-foreground">设置</Text>
          
          <View className="bg-surface rounded-2xl p-4 border border-border gap-4">
            <Text className="text-base font-semibold text-foreground">零付费模式：配置您的 API Key</Text>
            <Text className="text-xs text-muted">
              您的 Key 将被加密存储，仅用于为您生成报告。支持 OpenAI 兼容格式。
            </Text>
            <TextInput
              className="bg-background border border-border rounded-xl px-4 py-3 text-foreground"
              value={apiKey}
              onChangeText={setApiKey}
              placeholder="输入您的 API Key"
              secureTextEntry
              placeholderTextColor="#999"
            />
            <TouchableOpacity 
              className="bg-primary py-3 rounded-xl items-center"
              onPress={handleSave}
            >
              <Text className="text-background font-bold">保存配置</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-surface rounded-2xl p-4 border border-border gap-2">
            <Text className="text-base font-semibold text-foreground">关于 MiroFish</Text>
            <Text className="text-sm text-muted">版本: 1.0.0</Text>
            <Text className="text-sm text-muted">
              MiroFish 是一个基于多 Agent 博弈的群体智能投资分析引擎。
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
