#include <bits/stdc++.h>
using namespace std;

long long common_run_length(const std::string& a, const std::string& b) {
    int n = (int)a.size(), m = (int)b.size();
    std::vector<std::vector<long long>> dp(n + 1, std::vector<long long>(m + 1, 0));
    long long best = 0;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            if (a[i - 1] == b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                if (dp[i][j] > best) best = dp[i][j];
            }
    return best;
}

int main() {
    string a, b;
    cin >> a >> b;
    cout << common_run_length(a, b) << "\n";
    return 0;
}
