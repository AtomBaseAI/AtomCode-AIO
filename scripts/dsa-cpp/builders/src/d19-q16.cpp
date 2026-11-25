#include <bits/stdc++.h>
using namespace std;

int lps_length(const std::string& s) {
    int n = (int)s.size();
    std::vector<std::vector<int>> dp(n, std::vector<int>(n, 0));
    for (int i = 0; i < n; i++) dp[i][i] = 1;
    for (int len = 2; len <= n; len++)
        for (int i = 0; i + len - 1 < n; i++) {
            int j = i + len - 1;
            if (s[i] == s[j]) dp[i][j] = (len == 2) ? 2 : dp[i + 1][j - 1] + 2;
            else {
                int a = dp[i + 1][j], b = dp[i][j - 1];
                dp[i][j] = a > b ? a : b;
            }
        }
    return dp[0][n - 1];
}

int main() {
    string s;
    cin >> s;
    cout << lps_length(s) << "\n";
    return 0;
}
